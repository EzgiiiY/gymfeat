// frontend/src/components/layout/Headers.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Menu, Dropdown, Row, Col, Card, Button } from 'antd';
import { Input, Tabs, Typography } from 'antd';

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
      <Title>GymFeat</Title>
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