import React, { Component } from 'react';
import { List, Typography, Card, Button } from 'antd';
import welcomeImage from '../icons/welcome.png';
import background from '../icons/landing.jpg'
import background2 from '../icons/landing2.jpg'
import {Link} from 'react-router-dom';

import './welcome-page.css'

const { Title } = Typography;

const buttonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.212)",
    color:"orange",
  };

export default class WelcomePage extends Component { 
    
    render(){
      return(
        <div className='container' style={{ backgroundImage: `url(${background2})` }}>
            <List
                itemLayout="horizontal"
            >
                <List.Item font-color='white'>
                    <Title level={3}>Welcome to GymFeat</Title>
                </List.Item>
                <List.Item>
                    <Link to='/body-form-page' className='item'>
                        <Button style={buttonStyle}>Start Your Journey</Button>
                    </Link>
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