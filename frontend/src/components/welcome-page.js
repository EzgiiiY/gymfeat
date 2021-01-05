import React, { Component } from 'react';
import { List, Typography, Card, Button } from 'antd';
import welcomeImage from '../icons/welcome.png';

import './welcome-page.css'

const { Title } = Typography;

export default class WelcomePage extends Component { 
    
    render(){
      return(
        <div className='container'>
            <List
                itemLayout="horizontal"
            >
                <List.Item font-color='white'>
                    <Title level={3}>Welcome to GymFeat</Title>
                </List.Item>
                <List.Item>
                    <Button>Start Your Journey!</Button>
                </List.Item>
            </List>
        </div>
      );
    }
}