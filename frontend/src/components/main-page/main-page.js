import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // added
import { connect } from 'react-redux'; // added
import { Menu, Dropdown, Row, Col, Card, Button,Drawer } from 'antd';
import CalendarComponent from './calendar-component';

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            selectedDate: "",
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
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
                    style={{ position: 'absolute' }}
                >
                    <p>Some contents...</p>
                    {drawerButton}
                </Drawer>
            </div>
        );
    }
    render() {
        //const { user, isAuthenticated } = this.props.auth; // added


        // updated
        return (
            <div>
                
                <Col>
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