import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Menu, List,Row, Col, Card, Button, Drawer, Typography } from 'antd';
import CalendarComponent from './calendar-component';
import background2 from '../../icons/landing2.jpg'
import {addtoDB,getUserWorkouts,deleteUserWorkouts,createRoutine} from "../../actions/calendar";
import moment from 'moment';

import './main-page.css'

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            selectedDate: "",
            drawerContent:"",
        }
    }

    showDrawer = value => {
        if(value[0]){
            let lists = new Array();
            let content = new Array()
            for(let i = 0 ; i < value[0].length;i++){
                for(let j= 0;j<value[0][i].exerciseList.length;j++){
                    let list = value[0][i].exerciseList;
                    content.push(
                        <List.Item>
                            <List.Item.Meta title={list[j].Name}/>
                        </List.Item>
                    
                    )
                }
                lists.push(<List header={<h3>{value[0][i].workoutName}</h3>}>{content}</List>);
                content = new Array();
            }
            console.log(value)
        this.setState({
            visible: true,
            drawerContent:lists
        });
        }
        
        
    };

    onClose = () => {
        this.setState({
            visible: false,
            drawerContent:""
        });
    };

    setDrawerHeader=(date)=>{
        this.setState({
            selectedDate:date
            }
        )
    }
  

    renderDrawer() {
        const drawerButton = (
            <Link to='/exercise-page' className='item'>
                <Button>Start Exercise</Button>
            </Link>
        );
        return (
            <div className="site-drawer-render-in-current-wrapper">
                <Drawer
                    title={"Exercises on " + this.state.selectedDate}
                    placement="bottom"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    getContainer={true}
                    destroyOnClose={true}
                >
                    {this.state.drawerContent}
                    {drawerButton}
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
                <Button onClick={()=>{this.props.createRoutine(this.props.auth.user)}}>addtodb</Button>
                <Button onClick={()=>this.props.getUserWorkouts()}>getUserWorkouts</Button>
                <Button onClick={()=>this.props.deleteUserWorkouts()}>deleteUserWorkout</Button>

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
export default connect(mapStateToProps,{addtoDB,getUserWorkouts,deleteUserWorkouts,createRoutine})(MainPage);