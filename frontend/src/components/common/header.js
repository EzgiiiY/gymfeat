// frontend/src/components/layout/Headers.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Menu, Dropdown, Row, Col, Card,Button } from 'antd';
import { Input } from 'antd';

class HeaderMain extends Component {
  render() {
    //const { user, isAuthenticated } = this.props.auth; // added
    const { Search } = Input;

    const calendarViewLink = (
      <Link to='/main-page' className='item'>
          <Button>View Schedule</Button>
      </Link> 
    );

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

    const startTodaysWorkout = (
      <Link to='/exercise-page' className='item'>
          <Button>Start Today's Workout</Button>
      </Link>
    );

    const welcomePage = (
      <Link to='/welcome-page' className='item'>
          <Button>Home</Button>
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
      <div className='ui inverted menu' style={{ borderRadius: '5' }}>
        {welcomePage}
        {calendarViewLink}
        {startTodaysWorkout}
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