// frontend/src/components/auth/RegisterForm.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  Form,
  Input,
  Select,
  Col,
  Button,
  DatePicker,
  message
} from 'antd';
import history from '../../history'; // added
import { API, graphqlOperation } from 'aws-amplify';
import { register,validate } from '../../actions/auth';
import * as Mutation from '../../graphql/mutations';
import * as Queries from '../../graphql/queries';
import './register.css'
import '../body-form-page.css'

const { Option } = Select;

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


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      confirmationRequired: false,
      username: "",
      date: '',
      workoutGoal: '',
      workoutPastFrequency: '',
      workoutCurrentFrequency: '',
      weightUnit:"kg",
      heightUnit:"m",
      height:0,
      weight:0,
      gender:"",
      password:""
    }
    this.setDate = this.setDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWorkoutGoalSelect = this.handleWorkoutGoalSelect.bind(this);
    this.handlePastWorkoutFreqSelect = this.handlePastWorkoutFreqSelect.bind(this);
    this.handleCurWorkoutFreqSelect = this.handleCurWorkoutFreqSelect.bind(this);

  }


  onSubmit = async formValues => {
    // this.props.register(formValues, "employee");  
    console.log("formvalues onsubmit: ", formValues);
    console.log(this.state)
    let values={
      email: formValues.email,
      weight: this.state.weight,
      height: this.state.height,
      weightUnit: this.state.weightUnit,
      heightUnit:this.state.heightUnit,
      gender:this.state.gender,
      birhday:this.state.date,
      goal:this.state.workoutGoal,
      freqSoFar:this.state.workoutPastFrequency,
      freqDesired: this.state.workoutCurrentFrequency

    }
    try {
      await this.signUp(formValues.username,formValues.password, values);
      this.setState({ username: formValues.username, password: formValues.password,confirmationRequired: true });
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  onConfirmSignUp = async formValues => {
    try {
      await this.props.validate(this.state.username, formValues.code,this.state.password)
      history.push('/welcome-page')
    } catch (error) {
      console.log('error confirming sign up', error);
    }
    
  }

  async signUp(username,password,values) {
    const user = this.props.register(username, password, values)
    return user;
  }

  setDate(value) {
    this.setState({ date: value });
  }

  setWorkoutGoal(value) {
    this.setState({ workoutGoal: value });
  }

  setPastWorkoutFrequency(value) {
    this.setState({ workoutPastFrequency: value });
  }

  setCurWorkoutFrequency(value) {
    this.setState({ workoutCurrentFrequency: value });
  }

  handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);

    console.log(value)
    this.setDate(value.format('YYYY-MM-DD'));
    console.log("Date: " + this.state.date);
  };

  handleWorkoutGoalSelect = value => {
    message.info(`Selected Workout Goal: ${value}`);
    this.setWorkoutGoal(value);
  }

  handlePastWorkoutFreqSelect = value => {
    message.info(`How often did you exercise: ${value}`);
    this.setPastWorkoutFrequency(value);
  }

  handleCurWorkoutFreqSelect = value => {
    message.info(`How often do you want to exercise: ${value}`);
    this.setCurWorkoutFrequency(value);
  }

  onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
    };
    console.log('Received values of form: ', values);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/welcome-page' />;
    }

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
            <Form.Item 
              label="Enter your weight:"
              name="weight"
            >
              <Input.Group compact>
                <Select onChange={(value)=>this.setState({weightUnit:value})}defaultValue="kg" style={{ width: '20%' }}>
                  <Option value="kg">kg</Option>
                  <Option value="lb">lb</Option>
                </Select>
                <Input
                  style={{ width: '70%' }}
                  onChange={(e)=>this.setState({weight:e.target.value})}
                />
              </Input.Group>
            </Form.Item>
            <Form.Item 
              label="Enter your height:"
              name="height"
            >
              <Input.Group compact>
                <Select onChange={(value)=>this.setState({heightUnit:value})}defaultValue="m" style={{ width: '20%' }}>
                  <Option value="m">m</Option>
                  <Option value="ft">ft</Option>
                </Select>
                <Input
                  style={{ width: '70%' }}
                  onChange={(e)=>this.setState({height:e.target.value})}
                />
              </Input.Group>
            </Form.Item>
            <Form.Item label="Enter your gender:">
              <Select onChange={(value)=>this.setState({gender:value})}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="none">I choose not to disclose.</Option>
              </Select>
            </Form.Item>
            <Form.Item className="date-picker-checkbox" label="Enter your birthday:">
              <DatePicker onChange={this.handleChange} />
            </Form.Item>
            <Form.Item>
              <Select
                placeholder='Choose Your Workout Goal'
                onChange={this.handleWorkoutGoalSelect}>
                <Option value="lose weight">Lose Weight</Option>
                <Option value="strengthen">Strengthen</Option>
                <Option value="Stay Fit">Stay Fit</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Select
                placeholder='How often do you exercise (until now)?'
                onChange={this.handlePastWorkoutFreqSelect}>
                <Option value="almost zero">0 - 1 times a week</Option>
                <Option value="two three">2 - 3 times a week</Option>
                <Option value="four five">4 - 5 times a week</Option>
                <Option value="six or more">6+ times a week</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Select
                placeholder='How often do you want to exercise?'
                onChange={this.handleCurWorkoutFreqSelect}>
                <Option value="almost zero">1 time a week</Option>
                <Option value="two three">2 - 3 times a week</Option>
                <Option value="four five">4 - 5 times a week</Option>
                <Option value="six or more">6+ times a week</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button style={{ float: "right" }} type="primary" htmlType="submit">
                Continue
              </Button>
            </Form.Item>
          </Form>

          {this.state.confirmationRequired && <Form
            style={{ marginRight: "10vh", padding: "1vh 5vh 5vh 5vh" }}
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
              <Button style={{ float: "right" }} type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>

          </Form>}
        </Col>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

SignUp = connect(
  mapStateToProps,
  { register, validate }
)(SignUp);

export default reduxForm({
  form: 'registerForm'
})(SignUp);


