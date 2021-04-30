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
                <Col span={4}>
                    <Card title="Ravan Aliyev" cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    }
                    actions={[
                        <Button onClick={()=>window.open('', '_blank')}
                        icon={<GithubOutlined/>}/>,
                        <Button onClick={()=>window.open('' , '_blank')}
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={4}>
                    <Card title="Talha Burak Çuhadar" cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                    } 
                    actions={[
                        <Button  onClick={()=>window.open('https://github.com/talhaburakc', '_blank')}
                        icon={<GithubOutlined/>}/>,
                        <Button onClick={()=>window.open('https://linkedin.com/in/talhaburakc/', '_blank')} 
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={4}>
                    <Card title="Mustafa Çağrı Güngör" cover={
                    <img
                        alt="example"
                        src="https://media-exp1.licdn.com/dms/image/C4D03AQG471LXqsanyQ/profile-displayphoto-shrink_800_800/0/1606351914800?e=1625097600&v=beta&t=mTAqx5lUPDv7bIjBtfRMth6PIT2mTLzbCYqHRwkss2w"
                    />
                    }
                    actions={[
                        <Button onClick={()=>window.open('https://github.com/cagrigungor' , '_blank')}
                        icon={<GithubOutlined/>}/>,
                        <Button onClick={()=>window.open('https://linkedin.com/in/mcagrigungor/' , '_blank')}
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={4}>
                    <Card title="Ezgi Yavuz" cover={
                    <img
                        alt="example"
                        src="https://media-exp1.licdn.com/dms/image/C4D03AQF1FMM_1ksHyg/profile-displayphoto-shrink_800_800/0/1599822638402?e=1625097600&v=beta&t=GPxCeChgiSIZnigxF-XbWC6zsO4MxOo4_CLQovUnsZ8"
                    />
                    }
                    actions={[
                        <Button onClick={()=>window.open('https://github.com/EzgiiiY'  , '_blank')}
                        icon={<GithubOutlined/>}/>,
                        <Button onClick={()=>window.open('https://linkedin.com/in/ezgi-yavuz-024b89b6/'  , '_blank')}
                        icon={<LinkedinOutlined/>}/>,
                    ]}
                    bordered={false}>
                    Hello! I took part in .... 
                    I love ...
                    You can add me on Github, or Linkedin.
                    </Card>
                </Col>
                <Col span={4}>
                    <Card title="Gonca Yılmaz" cover={
                    <img
                        alt="example"
                        src={gonca}
                    />
                    }
                    actions={[
                        <Button onClick={()=>window.open('https://github.com/goncayilmaz' , '_blank')}
                        icon={<GithubOutlined/>}/>,
                        <Button onClick={()=>window.open('https://linkedin.com/in/goncayilmaz/' , '_blank')}
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

