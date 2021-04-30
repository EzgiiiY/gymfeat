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
  DatePicker
} from 'antd';


import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './profile-page.css'

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

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


export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

  render() {
    const {isAuthenticated, user} = this.props;
    if (!isAuthenticated) {
      return <Redirect to='/welcome-page' />;
    }
   
    return (
      <div>
        <h1 >Profile</h1>

        <Col className='pp'>

          <Form
            style={{ marginRight: "10vh", padding: "5vh 5vh 5vh 5vh" }}
            {...formItemLayout}
            name="profile"
            onFinish={values => this.onSubmit(values)}
            scrollToFirstError
          >
            <Form.Item className='job-item'
              label="Enter your nickname:"
              name="name"
            >
              <Input defaultValue={user.username}/>
            </Form.Item>
            <Form.Item
              name="email"
              label="Change E-mail Address"
            >
              <Input defaultValue={user.attributes.email}/>
              
            </Form.Item>
            <Form.Item
              name="password"
              label="Change Password"
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
            <Form.Item className="checkbox">
              <Checkbox>Would you like to get e-mails from us?</Checkbox>
            </Form.Item>
       
           
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update Profile
            </Button>
            </Form.Item>
          </Form>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProfilePage);