import React from 'react';
import {
    PauseOutlined,
    PlaySquareOutlined,
    StepBackwardOutlined,
    StepForwardOutlined,
  } from '@ant-design/icons';
import {Button, Divider} from 'antd';

export default class TopExercisePanel extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {exerciseName, repetitionCount, handlePause, isPlaying, handlePlay,
        handleGoForward, handleGoBack, setCount} = this.props;
        return (
            <div className="modal">
              <div className="modal_content">
                {exerciseName}
                <Divider type="vertical"></Divider>
                <Button onClick={handleGoBack}>
                    <StepBackwardOutlined></StepBackwardOutlined>
                </Button>
                {isPlaying && 
                <Button onClick={handlePause}>
                    <PauseOutlined></PauseOutlined>
                </Button>}
                {!isPlaying && 
                <Button onClick={handlePlay}>
                    <PlaySquareOutlined></PlaySquareOutlined>
                </Button>}
                <Button onClick={handleGoForward}>
                    <StepForwardOutlined></StepForwardOutlined>
                </Button>
                <Divider type="vertical"></Divider>
                {"Set: "}{setCount + 1}
                <Divider type="vertical"></Divider>
                {"Repetition: "}{repetitionCount}
                <Divider type="vertical"></Divider>
                <Button onClick={this.props.handleExit}>
                    Exit
                </Button>
              </div>
            </div>
          );
    }

}