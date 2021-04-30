import React from 'react'
import {Button, Form, Typography, Divider} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './workout-list-popup.css';
import Speech from 'react-speech'

const styleSpeech = {
  backgroundColor: "gainsboro",
  color:"black",
};

const handleClickStart = () => {
  //SpeechRecognition.startListening({continuous: true });
}



export default class WorkoutListPopup extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        const {handleClose} = this.props;
        return(
            <div className="modal-2">   
            <div className="modal_content_2">
              <Form>
                  <Form.Item>
                      <Typography.Title level={4}>Do you wanna start the workout?</Typography.Title>
                  </Form.Item>
                  <Form.Item>
                        <Link to='/exercise-page'>
                            <Button>
                            Yes
                            </Button>
                        </Link>
                  </Form.Item>
                  <Form.Item>
                        <Button onClick={handleClose}>
                        No, I will do it later.
                        </Button>
                  </Form.Item>
                </Form>
            </div>
          </div>
        );
    }

}