import React from 'react';
import { connect } from 'react-redux';
import '../../reducers/workout';
import { Layout, Menu, Switch, Divider } from 'antd';
import ExercisePage from './exercise-page';
import {
    WarningOutlined,
    UserOutlined,
    AudioMutedOutlined,
    SettingOutlined,
    SyncOutlined,
  } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class ExerciseWithSiderPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
           isHidden : false,
        };
    }

    onHide = isHidden => {
        this.setState({ isHidden });
    };

    onSwitchWarning = () =>{

    };

    onSwitchMute = () =>{

    };
    

    render() {
        const { isHidden } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={isHidden} onCollapse={this.onHide}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<WarningOutlined />}>
                    Warnings 
                    <Divider type="vertical" />
                    <Switch defaultChecked onChange={this.onSwitchWarning} />
                </Menu.Item>
                <Menu.Item key="2" icon={<AudioMutedOutlined />}>
                    Mute 
                    <Divider type="vertical" />
                    <Switch onChange={this.onSwitchMute} />
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                  Profile
                </Menu.Item>
                <SubMenu key="sub1" icon={<SettingOutlined />} title="Workout Settings">
                    <Menu.Item key="4">Set Count</Menu.Item>
                    <Menu.Item key="5">Repetition Count</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <ExercisePage voice = 'Google UK English Male'>
            </ExercisePage>
            </Layout>
        );
    }
    

}

/*
<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
*/