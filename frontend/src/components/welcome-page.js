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
            return <Redirect to='/home' />;
        }*/
        return (
            <div className='container' style={{ backgroundImage: `url(${background2})` }}>
                <List
                    itemLayout="horizontal"
                >
                    <List.Item font-color='white'>
                        <Title level={3}>Welcome to GymFeat</Title>
                    </List.Item>
                    <List.Item style={{ color: "whitesmoke" }}>
                        Already a user?
                    <Link to='/signIn' className='item'>
                            <Button style={buttonStyle}>Sign In</Button>
                        </Link>
                    </List.Item>
                    <List.Item style={{ color: "whitesmoke" }}>
                        Want to sign up?
                    <Link to='/signUp' className='item'>
                            <Button style={buttonStyle}>Sign Up</Button>
                        </Link>
                    </List.Item>
                    <List.Item style={{ marginRight: "2%", color: "whitesmoke" }}>
                        Want to be an anonymous user?
                    <Link to='/body-form-page' className='item'>
                            <Button style={buttonStyle}>Start Your Journey</Button>
                        </Link>
                        <br></br>
                        <br></br>

                    </List.Item>

                    <List.Item>
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