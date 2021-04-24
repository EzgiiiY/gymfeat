import React, { Component } from 'react';

import history from '../../history'; // added
import { connect } from 'react-redux';
import '../../App.css'
import '../../styles/css/main.css';
import { Layout, Menu, Breadcrumb, Button, Tabs, Dropdown } from 'antd';
import { DownOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';


const { TabPane } = Tabs;


const calendarViewLink = (
    <TabPane className='tabs'
        tab="Calendar"
        centered="true"
        key="calendar" />
);

const startTodaysWorkout = (
    <TabPane className='tabs'
        tab="Start Workout"
        centered="true"
        key="exercise" />

);
const welcomePage = (
    <TabPane tab="Home"
        key="home"
        centered="true"

    />
);

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Button ghost type="text" onClick={() => history.push("/profile")}><UserOutlined />Profile</Button>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <Button ghost type="text" onClick={() => history.push("/settings")}><SettingOutlined />Settings</Button>
        </Menu.Item>
    </Menu>
);

const userInfo = <Dropdown style={{minWidt:"fit-content"}}overlay={menu} trigger={['click']}>
    <Button style={{ marginRight: "10px" }}>
        user
            <DownOutlined />
    </Button>
</Dropdown>

class CustomTabs extends Component {
    tabClick(key) {
        if (key == "home")
            history.push("/welcome-page")
        else if (key == "exercise")
            history.push("/exercise-page")
        else if (key == "calendar")
            history.push("/main-page")
    }

    render() {
        return (
            <Tabs 
                onTabClick={this.tabClick}
                className='tabs'
                tabBarExtraContent={userInfo}
            >
                {welcomePage}
                {calendarViewLink}
                {startTodaysWorkout}
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default (connect(mapStateToProps))(CustomTabs);