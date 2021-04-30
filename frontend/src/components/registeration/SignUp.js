// frontend/src/components/auth/RegisterForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  DatePicker,
  message
} from 'antd';
import history from '../../history'; // added
import Amplify, { Auth } from 'aws-amplify';
import { register, validate } from '../../actions/auth';
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
    try {
      await this.signUp({ username: formValues.username, password: formValues.password, email: formValues.email });
      this.setState({ username: formValues.username, confirmationRequired: true });
    } catch (error) {
      console.log('error signing up:', error);
    }
    // history.push('/body-form-page')
  };

  onConfirmSignUp = async formValues => {
    console.log("formvalues onconfirm: ", formValues);
    try {
      await this.confirmSignUp(this.state.username, formValues.code);
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async signUp({ username, password, email }) {
    const user = this.props.register(email, password, username)
    return user;
  }

  async confirmSignUp({ username, code }) {
    try {
      this.props.validate(username, code)
    } catch (error) {
      console.log('error confirming sign up', error);
    }
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
    this.setState({ workoutCurFrequency: value });
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
      return <Redirect to='/main-page' />;
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
            <Form.Item className='job-item'
              label="Enter your weight:"
              name="weight"
            >
              <Input.Group compact>
                <Select defaultValue="kg" style={{ width: '20%' }}>
                  <Option value="kg">kg</Option>
                  <Option value="lb">lb</Option>
                </Select>
                <Input
                  style={{ width: '70%' }}
                  placeholder="Weight"
                />
              </Input.Group>
            </Form.Item>
            <Form.Item className='job-item'
              label="Enter your height:"
              name="height"
            >
              <Input.Group compact>
                <Select defaultValue="m" style={{ width: '20%' }}>
                  <Option value="m">m</Option>
                  <Option value="ft">ft</Option>
                </Select>
                <Input
                  style={{ width: '70%' }}
                  placeholder="Height"
                />
              </Input.Group>
            </Form.Item>
            <Form.Item className='job-item' label="Enter your gender:">
              <Select>
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
                <Option value="none">Buluruz daha</Option>
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


