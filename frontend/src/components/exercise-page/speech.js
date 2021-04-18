import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {Button, Form, Typography} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import './pop-up.css';
import Speech from 'react-speech'


const handleClickStart = () => {
  SpeechRecognition.startListening({continuous: true });
}

const SpeechRecognizerPopup = (props) => {
  const { finalTranscript, transcript, resetTranscript } = useSpeechRecognition()
 

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  var words = finalTranscript.split(" ");
  var word = words[words.length - 1];
  if(word == "yes"){
    props.startWorkout();
  } else if(word == "no"){
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
                <Button onClick={handleClickStart}>
                  <Speech textAsButton={true} displayText="Start" text="Say yes, if you are ready" voice="Google UK English Female"/>
                </Button>
            </Form.Item>
            <Form.Item>
                <Link to='/main-page'>
                    <Button onClick={resetTranscript}>
                      <Speech textAsButton={true} displayText="Go back to Main" text="Come back when you are ready" voice="Google UK English Female"/>
                    </Button>
                </Link> 
            </Form.Item>
            <Form.Item>
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}

export default SpeechRecognizerPopup