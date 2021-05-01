import React, { Component } from 'react';

import history from '../../history'; // added
import { connect } from 'react-redux';
import '../../App.css'
import '../../styles/css/main.css';
import { Layout, Menu, Breadcrumb, Button, Tabs, Dropdown } from 'antd';
import { DownOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { logout } from '../../actions/auth';

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

const workoutList = (
    <TabPane tab="Workouts"
        key="workoutList"
        centered="true"
    />
);




class CustomTabs extends Component {
    constructor(props){
        super(props);
        this.state={activeKey:"home"}
        this.tabClick=this.tabClick.bind(this);
    }
    
    tabClick(key) {
        this.setState({activeKey:key})

        if (key == "home"){
            history.push("/welcome-page")
        }
        else if (key == "exercise"){
            history.push("/exercise-page")
        }
        else if (key == "calendar"){
            history.push("/main-page")
        }
        else if (key == "workoutList"){
            history.push("/workoutList")
        }
    }

    determineActiveKey(page){
        switch (page){
            case "/welcome-page":
                return "home";//this.setState({activeKey:"home"});
            case "/exercise-page":
                return "exercise";//this.setState({activeKey:"exercise"});
            case "/main-page":
                return "calendar"//this.setState({activeKey:"calendar"});
            case "/workoutList":
                return "workoutList";//this.setState({activeKey:"workoutList"});
        } 
        
    }
    componentDidMount(){
        console.log("hello")
    }
    componentDidUpdate(prevProps){
        if(prevProps.user!=this.props.user)
            console.log("current user: " + this.props.user)
    }

    

    getUserInfo() {

        let menu = (
            <Menu>
                <Menu.Item key="0">
                    <Button ghost type="text" onClick={() => history.push("/profile")}><UserOutlined />Profile</Button>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1">
                    <Button ghost type="text" onClick={() => this.props.logout()}><SettingOutlined />Log out</Button>
                </Menu.Item>
            </Menu>
        );
        console.log(this.props.auth.isAuthenticated)
        return (<Dropdown style={{ minWidt: "fit-content" }} overlay={menu} trigger={['click']}>
            <Button style={{ marginRight: "10px" }}>
                {this.props.auth.user?this.props.auth.user.username:"user"}

                <DownOutlined />
            </Button>
        </Dropdown>);
    }

    render() {
        return (
            <Tabs
                activeKey={this.determineActiveKey(window.location.pathname)}
                onChange={this.tabClick}
                className='tabs'
                tabBarExtraContent={<>{this.props.auth.isAuthenticated&&this.getUserInfo()}</>}
            >
                {welcomePage}
                {this.props.auth.isAuthenticated&&calendarViewLink}
                {this.props.auth.isAuthenticated&&workoutList}
                {this.props.auth.isAuthenticated&&startTodaysWorkout}

            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default (connect(mapStateToProps, { logout }))(CustomTabs);