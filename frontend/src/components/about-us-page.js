import React, { Component } from 'react';
import { Card, Col, Row, Button, List } from 'antd';
import {GithubOutlined, LinkedinOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import gonca from '../icons/our_pics/IMG_2224.png'
import './about-us-page.css'

export default class AboutUsPage extends Component {
    
    render() {
        return(
        <div className="container">
            <List>
                <List.Item>
                <Row justify="space-around">
                <Col span={5}>
                    <Card title="Talha Burak Çuhadar" cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    } 
                    actions={[
                        <Button href='https://github.com/talhaburakc' 
                        icon={<GithubOutlined/>}/>,
                        <Button href='https://linkedin.com/in/talhaburakc/' 
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="Mustafa Çağrı Güngör" cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    }
                    actions={[
                        <Button href='https://github.com/cagrigungor' 
                        icon={<GithubOutlined/>}/>,
                        <Button href='https://linkedin.com/in/mcagrigungor/'
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="Ezgi Yavuz" cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    }
                    actions={[
                        <Button href='https://github.com/EzgiiiY' 
                        icon={<GithubOutlined/>}/>,
                        <Button href='https://linkedin.com/in/ezgi-yavuz-024b89b6/' 
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={5}>
                    <Card title="Gonca Yılmaz" cover={
                    <img
                        alt="example"
                        src={gonca}
                    />
                    }
                    actions={[
                        <Button href='https://github.com/goncayilmaz' 
                        icon={<GithubOutlined/>}/>,
                        <Button href='https://linkedin.com/in/goncayilmaz/' 
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hi! I took part in the frontend and ML part of the project.
                    I love coding.
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                </Row>
                </List.Item>
                <List.Item>
                    <Link to='/welcome-page'>
                    <Button type="primary" >
                    Go Back
                    </Button>
                    </Link>
                </List.Item>
            </List> 
        </div>
        );
    }
}
