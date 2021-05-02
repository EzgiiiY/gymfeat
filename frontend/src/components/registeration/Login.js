// frontend/src/components/auth/LoginForm.js

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../actions/auth';
import background2 from '../../icons/landing2.jpg'
import logo from '../../icons/logo.png'

import 'antd/dist/antd.css';

import { Table, Layout, Button, Input, Image, Form } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }


  async onSubmit (formValues) {
    this.setState({loading:true});
    await this.login(formValues);
    this.setState({loading:false})
  };

  async login(formValues){
    return this.props.login(formValues)
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/welcome-page' />;
    }

    return (
      <div className='container' style={{ backgroundImage: `url(${background2})` }}>

        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => this.onSubmit(values)}
          onFinishFailed={null}
        >
          <Image style={{ float: "center" }} preview={false} src={logo} />
          <br></br>
          <br></br>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button style={{color: "#fff"}} type="text" >
              Forgot password?
          </Button>
          <Form.Item {...tailLayout}>
          
            <Button style={{ float: "right" }} type="primary" htmlType="submit" loading={this.state.loading}>
              Login
          </Button>
          
          </Form.Item>
        </Form>
       
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

LoginForm = connect(
  mapStateToProps,
  { login }
)(LoginForm);

export default reduxForm({
  form: 'loginForm'
})(LoginForm);