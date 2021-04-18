import WebcamPosenetComponent from './webcam-posenet-page';
import React from 'react';
import { connect } from 'react-redux';
import '../../reducers/workout';
import { startWorkout, endWorkout } from '../../actions/workout';
import SpeechRecognizerPopup from './speech'
import './webcam-page.css';

class ExercisePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isWorkoutStarted: false,
        };
        this.startWorkout = this.startWorkout.bind(this);
    }

    startWorkout = () => {
        this.setState({
            isWorkoutStarted: true,
        });
    };

    render(){
        const {isWorkoutStarted} = this.state;
        return(
            <div className='webcam-container'>
                {!isWorkoutStarted && <SpeechRecognizerPopup startWorkout={this.startWorkout}/> }
                <WebcamPosenetComponent isWorkoutStarted={isWorkoutStarted}></WebcamPosenetComponent>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    //isWorkoutStarted: state.isWorkoutStarted,
});

ExercisePage = connect(
    mapStateToProps,
    {startWorkout},
  )(ExercisePage);
export default connect(mapStateToProps)(ExercisePage);