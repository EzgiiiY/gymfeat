// frontend/src/components/auth/RegisterForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';

import {
  Form,
  Input,
  Tooltip,
  Modal,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  DatePicker
} from 'antd';
import './profile-page.css'
import { changePassword,updateUserInfo } from "../../actions/auth"
import { DownOutlined } from '@ant-design/icons';


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
      loading: false,
      modalVisible: false,
      loading:false,
      oldPassword:"",
      newPassword:"",
      username: "",
      date: this.props.user.attributes["custom:birhday"],
      workoutGoal: this.props.user.attributes["custom:goal"],
      workoutCurrentFrequency: this.props.user.attributes["custom:freqDesired"],
      weightUnit:this.props.user.attributes["custom:weightUnit"],
      heightUnit:this.props.user.attributes["custom:heightUnit"],
      height:this.props.user.attributes["custom:height"],
      weight:this.props.user.attributes["custom:weight"],
      gender:this.props.user.attributes["custom:gender"],
    }
    this.handleChangePassword=this.handleChangePassword.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWorkoutGoalSelect = this.handleWorkoutGoalSelect.bind(this);
    this.handleCurWorkoutFreqSelect = this.handleCurWorkoutFreqSelect.bind(this);
  }

  onSubmit = async formValues => {
    console.log("formvalues onsubmit: ", formValues);
    console.log(this.state)
    let values={
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
      this.props.updateUserInfo(values);
    } catch (error) {
      console.log('error updating:', error);
    }
  };

  setDate(value) {
    this.setState({ date: value });
  }

  setWorkoutGoal(value) {
    this.setState({ workoutGoal: value });
  }

  setCurWorkoutFrequency(value) {
    this.setState({ workoutCurrentFrequency: value });
  }

  handleChange = value => {
    console.log(value)
    this.setDate(value.format('YYYY-MM-DD'));
    console.log("Date: " + this.state.date);
  };

  handleWorkoutGoalSelect = value => {
    this.setWorkoutGoal(value);
  }

  handleCurWorkoutFreqSelect = value => {
    this.setCurWorkoutFrequency(value);
  }


  handleOk(){
    this.setState({loading:true})
    this.props.changePassword(this.state.oldPassword,this.state.newPassword)
    this.setState({modalVisible:false,loading:false,newPassword:"",oldPassword:""})
  }
  renderModal(){
    return(
    <Modal
        title="Change Password"
        visible={this.state.modalVisible}
        onOk={this.handleOk}
        okButtonProps={{loading:this.state.loading}}
        confirmLoading={this.state.loading}
        onCancel={()=>    this.setState({modalVisible:false,loading:false,newPassword:"",oldPassword:""})}
      >
        <Row gutter={[8,32]}>
        <Input.Password onChange={(e)=>{this.setState({oldPassword:e.target.value})}} addonBefore="Old Password"/>
        <br></br>
        </Row>
        <Row>
        <Input.Password onChange={(e)=>{this.setState({newPassword:e.target.value})}} addonBefore="New Password"/>

        </Row>
      </Modal>);
  }

  handleChangePassword() {
    this.setState({modalVisible:true})
  }


  render() {
    const { isAuthenticated, user } = this.props;

    if (!isAuthenticated) {
      return <Redirect to='/welcome-page' />;
    }
    const { attributes } = user
    console.log(attributes)
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
              label="Username:"
              name="name"
            >
              <Input defaultValue={user.username} />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail:"
            >
              <Input disabled defaultValue={user.attributes.email} />

            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              hasFeedback
            >
              <Input.Password defaultValue="aaaa" disabled style={{ maxWidth: "50%" }} />
              <Button onClick={this.handleChangePassword} type="link">Change Password</Button>
            </Form.Item>

            <Form.Item className='job-item'
              label="Weight:"
              name="weight"
            >
              <Input.Group compact>
                <Select defaultValue={attributes["custom:weightUnit"]} style={{ width: '20%' }}>
                  <Option value="kg">kg</Option>
                  <Option value="lb">lb</Option>
                </Select>
                <Input
                  style={{ width: '70%' }}
                  defaultValue={attributes["custom:weight"]}
                />
              </Input.Group>
            </Form.Item>
            <Form.Item className='job-item'
              label="Height:"
              name="height"
            >
              <Input.Group compact>
                <Select defaultValue={attributes["custom:heightUnit"]} style={{ width: '20%' }}>
                  <Option value="m">m</Option>
                  <Option value="ft">ft</Option>
                </Select>
                <Input
                  style={{ width: '70%' }}
                  defaultValue={attributes["custom:height"]}
                />
              </Input.Group>
            </Form.Item>
            <Form.Item className='job-item' label="Gender:">
              <Select defaultValue={attributes["custom:gender"]}>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="none">I choose not to disclose.</Option>
              </Select>
            </Form.Item>
            <Form.Item className="date-picker-checkbox" label="Birthday:">
              <DatePicker defaultValue={moment(attributes["custom:birhday"],'YYYY-MM-DD')}  onChange={this.handleChange} />
            </Form.Item>
            <Form.Item className='job-item' label="Workout Goal:">
              <Select defaultValue={attributes["custom:goal"]} 
                onChange={this.handleWorkoutGoalSelect}>
                <Option value="lose weight">Lose Weight</Option>
                <Option value="strengthen">Strengthen</Option>
                <Option value="none">Buluruz daha</Option>
              </Select>
            </Form.Item>
            <Form.Item className='job-item' label="Exercise Frequency:">
              <Select defaultValue={attributes["custom:freqDesired"]} 
                onChange={this.handleCurWorkoutFreqSelect}>
                <Option value="almost zero">1 time a week</Option>
                <Option value="two three">2 - 3 times a week</Option>
                <Option value="four five">4 - 5 times a week</Option>
                <Option value="six or more">6+ times a week</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update Profile
            </Button>
            </Form.Item>
          </Form>
        </Col>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { changePassword,updateUserInfo })(ProfilePage);