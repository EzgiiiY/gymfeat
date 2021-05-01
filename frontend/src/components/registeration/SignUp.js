// frontend/src/components/auth/RegisterForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import history from '../../history'; // added
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { register } from '../../actions/auth';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './register.css'
import * as Mutation from '../../graphql/mutations';
import * as Queries from '../../graphql/queries';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      confirmationRequired: false,
      username: ""
    }

  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  
  onSubmit = async formValues => {
    // this.props.register(formValues, "employee");  
    console.log("formvalues onsubmit: ", formValues);
    try {
      await this.signUp({username: formValues.username, password: formValues.password, email: formValues.email});
      this.setState({username: formValues.username, confirmationRequired: true});
    } catch (error) {
      console.log('error signing up:', error);
    }
    // history.push('/body-form-page')
  };

  onConfirmSignUp = async formValues => {
    console.log("formvalues onconfirm: ", formValues);
    try {
      await Auth.confirmSignUp(this.state.username, formValues.code);
      history.push('/body-form-page')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async signUp({username, password, email}) {
      const { user } = await Auth.signUp({
          username,
          password,
          attributes: {
            email
          }
      });
      console.log(user);
      return user;
  }

  async confirmSignUp({username, code}) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  }

  async login(e) {
    const user = await Auth.signIn("talha", "123456");
    console.log("user: ", user);
  }

  async amILogged(e) {
    const user = await Auth.currentUserInfo();
    console.log("user: ", user);
  }

  async signOut(e) {
    const user = await Auth.signOut();
    console.log("user: ", user);
  }

  async addtoDB() {
    // const todo = { name: "My first todo", description: "Hello world!" };
    // const workout = new Model.Workout({id: "15", username: "talha", date: "todaysdate", workout_id: 15});
    const workout = {
      username: "deneme",
      date: "tomorrowsdate",
      workout_id: 1
    }
    try {
      await API.graphql(graphqlOperation(Mutation.createWorkout, {input: workout}));
    } catch (e) {
      console.log("error adding to db: ", e);
    }
  }

  async getFromDB() {
    

    // get all
    const allWorkouts = await API.graphql({ query: Queries.listWorkouts });
    console.log("all workouts: ", allWorkouts);

    // get the workout _id == id. id is the automatically assigned uuid in this case.
    // this `Queries.getWorkout` only works for fetching via the id, this is rly useful for us.
    // the uuid can be found in dynamodb via awsconsole or get the uuid through querying for all by also filtering
    // const workout = await API.graphql({ query: Queries.getWorkout, variables: { id: "<some uuid>" }});

    // refer to: https://docs.amplify.aws/lib/graphqlapi/query-data/q/platform/js#filtered-and-paginated-queries for filters
    let filter = {
      username: {
          eq: "talha"
      }
    };

    // list all workouts whose _username == username
    // this is better for us because we can filter by anything and not only by the uuid as it was above 
    const workouts = await API.graphql({ query: Queries.listWorkouts, variables: {filter: filter}});
    console.log("filtered workouts: ", workouts);

  }

  async updateInDB() {
    const uuid = "7fab4ed0-5cc3-4148-b131-4c94557986e4";
    let workout = await API.graphql({ query: Queries.getWorkout, variables: { id: uuid }});
    console.log("prev workout: ", workout);
    let prevDate = workout.data.getWorkout.date;
    console.log("prev workout's date: ", prevDate);

    const workoutDetails = {
      id: uuid,
      date: prevDate + " updated",
    };
    const updatedWorkout = await API.graphql({ query: Mutation.updateWorkout, variables: {input: workoutDetails}});

    workout = await API.graphql({ query: Queries.getWorkout, variables: { id: uuid }});
    console.log("current workout: ", workout);
    console.log("current workout's date: ", workout.data.getWorkout.date);
  }

  async deleteInDB() {
    const uuid = "<some uuid>";
    const workoutDetails = {
      id: uuid
    };
    const deletedWorkout = await API.graphql({ query: Mutation.deleteWorkout, variables: {input: workoutDetails}});
  }

  render() {
    /*if (this.props.isAuthenticated) {
      return <Redirect to='/main-page' />;
    }*/
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <h1 >Sign Up</h1>

        <Col className='register'>

          <Form
            style={{ marginRight: "10vh", padding: "5vh 5vh 5vh 5vh" }}
            {...formItemLayout}
            name="register"
            onFinish={values => this.onSubmit(values)} 
            scrollToFirstError
          >
            <Form.Item
              name="profilepic"
              label="Profile Photo"
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>

            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button style={{float:"right"}} type="primary" htmlType="submit">
                  Continue
              </Button>
            </Form.Item>
          </Form>

          {this.state.confirmationRequired && <Form
            style={{ marginRight: "10vh", padding: "5vh 5vh 5vh 5vh" }}
            {...formItemLayout}
            name="confirmation"
            onFinish={values => this.onConfirmSignUp(values)} 
            scrollToFirstError
          >
            <Form.Item
              name="code"
              label="Confirmation Code"
              rules={[{ required: true, message: 'Please input your confirmation code!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button style={{float:"right"}} type="primary" htmlType="submit">
                  Confirm
              </Button>
            </Form.Item>

          </Form>}
          
          <Button style={{float:"right"}} type="primary" onClick={(e) => this.login()}>
                login
          </Button>

          <Button style={{float:"right"}} type="primary" onClick={(e) => this.signOut()}>
                signout
          </Button>

          <Button style={{float:"right"}} type="primary" onClick={(e) => this.amILogged()}>
                am i logged?
          </Button>

          <Button style={{float:"right"}} type="primary" onClick={(e) => this.addtoDB()}>
                add sth to db
          </Button>

          <Button style={{float:"right"}} type="primary" onClick={(e) => this.getFromDB()}>
                get from db
          </Button>

          <Button style={{float:"right"}} type="primary" onClick={(e) => this.updateInDB()}>
                update in db
          </Button>

          <Button style={{float:"right"}} type="primary" onClick={(e) => this.deleteInDB()}>
                delete in db
          </Button>
        </Col>
      </div>
    );
  }
}
/*function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

SignUp = connect(
  mapStateToProps,
  { register }
)(SignUp);
*/
export default reduxForm({
  form: 'registerForm'
})(SignUp);