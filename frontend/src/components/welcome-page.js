import React, { Component } from 'react';
import { List, Typography, Card, Button } from 'antd';
import welcomeImage from '../icons/welcome.png';
import {Link} from 'react-router-dom';

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
                    <Link to='/body-form-page' className='item'>
                        <Button>Start Your Journey!</Button>
                    </Link>
                </List.Item>
            </List>
        </div>
      );
    }
}