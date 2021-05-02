// frontend/src/components/layout/Headers.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Row, Col, Card, Button } from 'antd';
import { Input, Tabs, Typography, Image } from 'antd';
import home_icon from "../../icons/logo.png"

const { TabPane } = Tabs;
const { Title } = Typography;


class HeaderMain extends Component {
  render() {
    //const { user, isAuthenticated } = this.props.auth; // added
    const { Search } = Input;
    
    const viewAppliedJob = (
      <Link to='/view_jobs' className='item'>
          <Button>View Applied Job</Button>
      </Link> 
    );

    const feelingLucky = (
      <Button>I Feel Lucky</Button>
    );

    const jobViewLink = (
      <Link to='/view_jobs' className='item'>
          <Button>View Applied Jobs</Button>
      </Link>
    );
    
    const searchButton = (
        <Search
        placeholder={"Search"}
        allowClear
      />
    );

    // added
    const guestLinks = (
        <Link to='/register_employee' className='item'>
          <Button>Register</Button>
        </Link>    
    );

    // updated
    return (
      <div className='header-container'>
      <Row>
      <Col span={1}><Image
        width={30}
        src={home_icon}
      /></Col>
      <Col className='title-container' span={23}><Title level={2}>GymFeat: Your Home Workout Buddy</Title></Col>
    </Row>
      </div>
    );
  }
}

// added
const mapStateToProps = state => ({
  
});

// updated
export default connect(
  mapStateToProps
)(HeaderMain);