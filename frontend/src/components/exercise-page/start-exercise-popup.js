import React, { Component } from "react";
import {Button, Form, Typography} from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import './pop-up.css';

class StartExercisePopup extends Component {
  
    handleClickYes = () => {
        this.props.startWorkout();
    };

    render() {
        return (
        <div className="modal">
            <div className="modal_content">
            {//<Button className="close" shape="circle" icon={<CloseCircleOutlined />} />
            }
            <Form>
                <Form.Item>
                    <Typography.Title level={4}>Are you ready?</Typography.Title>
                </Form.Item>
                <Form.Item>
                    <Button onClick={this.handleClickYes}>
                        Yes
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to='/main-page'>
                        <Button>No, go back to Main Page!</Button>
                    </Link> 
                </Form.Item>
            </Form>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    
});

StartExercisePopup = connect(
    mapStateToProps,
)(StartExercisePopup);
export default connect(mapStateToProps)(StartExercisePopup);