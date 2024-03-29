import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Menu, List, Row, Col, Card, Button, Drawer, Typography,Progress } from 'antd';
import CalendarComponent from './calendar-component';
import background2 from '../../icons/landing2.jpg'
import { chooseWorkout } from "../../actions/workout";
import history from '../../history'; // added

import { addtoDB, getUserWorkouts, deleteUserWorkouts, createRoutine } from "../../actions/calendar";
import moment from 'moment';

import './main-page.css'

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            visible: false,
            selectedDate: "",
            drawerContent: "",
        }
    }

    showDrawer = value => {
        if (value) {

            let lists = new Array();
            for (let m = 0; m < value.length; m++) {
                
                let content = new Array()
                for (let i = 0; i < value[m].length; i++) {
                    for (let j = 0; j < value[m][i].exerciseList.length; j++) {
                        let list = value[m][i].exerciseList;
                        content.push(
                            <List.Item>
                                <List.Item.Meta title={list[j].Name} />
                            </List.Item>

                        )
                    }
                    let drawerButton = (

                        <Button onClick={(e) => { this.props.chooseWorkout(value[m][i]); history.push("/exercise-page") }}>Start Exercise</Button>

                    );
                    lists.push(<List header={<><h3>{value[m][i].workoutName}</h3>{drawerButton}</>}>{content}</List>);
                }
            }
            console.log(value)
            this.setState({
                visible: true,
                drawerContent: lists
            });
        }


    };

    onClose = () => {
        this.setState({
            visible: false,
            drawerContent: ""
        });
    };

    setDrawerHeader = (date) => {
        this.setState({
            selectedDate: date
        }
        )
    }


    renderDrawer() {

        return (
            <div className="site-drawer-render-in-current-wrapper">
                <Drawer
                    title={"Workouts on " + this.state.selectedDate}
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={true}
                    destroyOnClose={true}
                >
                    {this.state.drawerContent}
                </Drawer>
            </div>
        );
    }
    render() {
        const { isAuthenticated } = this.props.auth; // added

        if (!isAuthenticated) {
            return <Redirect to='/welcome-page' />;
        }
        // updated
        return (
            <div style={{ backgroundImage: `url(${background2})` }}>
                <Button type="primary" onClick={() => {this.props.createRoutine(this.props.auth.user)}}>Create a Routine For Me!</Button>
                <Button style={{float:"right"}}type="primary" onClick={() => {this.props.deleteUserWorkouts()}}>Clear History</Button>

                <div className='site-calendar-customize-header-wrapper'>
                    <Typography.Title level={4}>Your Calendar</Typography.Title>
                    <Col className='site-calendar'>
                       <CalendarComponent
                            onClick={this.showDrawer}
                            getDate={this.setDrawerHeader}
                        />
                    </Col>
                    <Col>
                        {this.renderDrawer()}
                    </Col>


                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps, { chooseWorkout, addtoDB, getUserWorkouts, deleteUserWorkouts, createRoutine })(MainPage);