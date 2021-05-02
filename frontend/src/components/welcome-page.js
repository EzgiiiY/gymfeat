import React, { Component } from 'react';
import { List, Typography, Card, Button } from 'antd';
import { connect } from 'react-redux';

import welcomeImage from '../icons/welcome.png';
import background from '../icons/landing.jpg'
import background2 from '../icons/landing2.jpg'
import { Link } from 'react-router-dom';

import './welcome-page.css'

const { Title } = Typography;

const buttonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.212)",
    color: "orange",
    float: "right",
    marginRight: "0",
};

class WelcomePage extends Component {

    render() {
        /*const { user, isAuthenticated } = this.props.auth; // added
        if (isAuthenticated) {
            return <Redirect to='/main-page' />;
        }*/
        return (
            <div className='container' style={{ backgroundImage: `url(${background2})` }}>
                <List
                    itemLayout="horizontal"
                >
                    <List.Item font-color='white'>
        <Title level={3}>Welcome to GymFeat {this.props.auth.isAuthenticated&&this.props.auth.user.username}</Title>
                    </List.Item>
                    {!this.props.auth.isAuthenticated&&
                    <><List.Item style={{ color: "whitesmoke" }}>
                        Want to join us?
                        <Link to='/signUp' className='item'>
                            <Button style={buttonStyle}>Sign Up</Button>
                        </Link>
                    </List.Item>
                    <List.Item style={{ color: "whitesmoke" }}>
                        Already a user?
                    <Link to='/login' className='item'>
                            <Button style={buttonStyle}>Sign In</Button>
                        </Link>
                    </List.Item></>
                    }
                    
                    <List.Item >
                        <Link to='/about-us' className='item'>
                            <Button style={buttonStyle}>About Us</Button>
                        </Link>
                    </List.Item>
                </List>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}
export default (connect(mapStateToProps  ))(WelcomePage);