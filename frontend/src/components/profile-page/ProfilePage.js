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

export class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
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


  render() {
    //const {isAuthenticated, user} = this.props;
    /*if (!isAuthenticated) {
      return <Redirect to='/welcome-page' />;
    }*/

    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
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
            <Form.Item
              name="profilepic"
              label="Upload/Change Profile Photo"
            >
              <br></br>
              <br></br>
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

            <Form.Item className='job-item'
              label="Enter your nickname:"
              name="name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Change E-mail Address"
            >
              <Input placeholder="mail" /> {//{user.email}/>
              }
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

/*const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
});*/

export default ProfilePage;//connect(mapStateToProps)(ProfilePage);