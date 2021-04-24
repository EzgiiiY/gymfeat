import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Menu, Dropdown, Row, Col, Card, Button, Drawer, Typography } from 'antd';
import CalendarComponent from './calendar-component';

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
        this.setState({
            visible: true,
            drawerContent:value
        });
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
                    <p>{this.state.drawerContent}</p>
                    {drawerButton}
                </Drawer>
            </div>
        );
    }
    render() {
        //const { user, isAuthenticated } = this.props.auth; // added


        // updated
        return (
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
        );
    }
}

export default (MainPage);