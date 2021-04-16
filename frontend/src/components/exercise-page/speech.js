import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {Button, Form, Typography} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import './pop-up.css';

const Speech = (props) => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  if(transcript == "yes"){
    props.startWorkout();
  } else if(transcript == "no"){
    return <Redirect to='/main-page'/>;
  }
  
  return (
    <div className="modal">
      <div className="modal_content">
        <Form>
            <Form.Item>
                <Typography.Title level={4}>If you are ready, click on 'Start' and go to your position</Typography.Title>
                <Typography.Title level={5}>Then say YES!</Typography.Title>
                <Typography.Title level={5}>If you say, NO, then you will be back to main page.</Typography.Title>
            </Form.Item>
            <Form.Item>
                <Button onClick={SpeechRecognition.startListening}>
                    Start
                </Button>
            </Form.Item>
            <Form.Item>
                <Link to='/main-page'>
                    <Button onClick={resetTranscript}>No, go back to Main Page!</Button>
                </Link> 
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}
export default Speech