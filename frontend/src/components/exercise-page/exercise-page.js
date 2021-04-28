import WebcamPosenetComponent from './webcam-posenet-page';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../reducers/workout';
import { startWorkout, endWorkout } from '../../actions/workout';
import SpeechRecognizerPopup from './speech'
import ReactPlayer from "react-player"
import TopExercisePanel from "./top-exercise-panel"
import './webcam-page.css';

class ExercisePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isWorkoutStarted: false,
            playing: false,
            startingFrom: 43, //starting from 43rd
            workoutStopped: false,
            repetitionCount: 0,
            voiceObject: null,
        };
        this.startWorkout = this.startWorkout.bind(this);
        this.playerRef = React.createRef();
    }

    getVoiceByName = (name) => {
      var voices = window.speechSynthesis.getVoices();
      for(var i  = 0; i < voices.length; i++){
        if(voices[i].name == name)
          return voices[i];
      }
      return voices[0];
    };
    
    componentDidMount(){
      setTimeout(() => {
        this.setState({
          voiceObject: this.getVoiceByName(this.props.voice),
        });
      }, 50);
    }


    startWorkout = () => {
        this.setState({
            isWorkoutStarted: true,
            playing: true,
        });
        this.playerRef.current.seekTo(43);
    };

    setRepetitionCount = (repetition) => {
        this.setState({
          repetitionCount:repetition,
        });
        if(this.props.warningsOn){
          var synth = window.speechSynthesis;
          var utterThis = new SpeechSynthesisUtterance(repetition.toString());
          utterThis.voice = this.state.voiceObject;
          synth.speak(utterThis);
        }
    };

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
      }
    
      handleStop = () => {
        this.setState({ url: null, playing: false })
      }
    
      handleToggleControls = () => {
        const url = this.state.url
        this.setState({
          controls: !this.state.controls,
          url: null
        }, () => this.load(url))
      }
    
      handleToggleLight = () => {
        this.setState({ light: !this.state.light })
      }
    
      handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
      }
    
      handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
      }
    
      handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
      }
    
      handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
      }
    
      handlePlay = () => {
        this.setState({ playing: true,
        workoutPaused: false })
      }
    
      handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false,
        workoutPaused: true })
      }
    
      handleSeekMouseDown = e => {
        this.setState({ seeking: true })
      }
    
      handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
      }
    
      handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
      }
    
      handleProgress = state => {
        //console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
      }
    
      handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
      }
    
      handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
      }
    

    render(){
        const {isWorkoutStarted, playing, repetitionCount} = this.state;
        const {muted, warningsOn} = this.props;
        const {voice, url, handleExit} = this.props;
        return(
            <div className='webcam-container'>
                {!isWorkoutStarted && <SpeechRecognizerPopup 
                startWorkout={this.startWorkout}
                voice = {voice}
                warningsOn = {warningsOn}/> 
                }
                {isWorkoutStarted &&  
                  <TopExercisePanel exerciseName = {"Sample Exercise"}
                  repetitionCount = {repetitionCount}
                  isPlaying = {playing}
                  handlePause = {this.handlePause}
                  handlePlay = {this.handlePlay}
                  handleExit = {handleExit}
                  ></TopExercisePanel>}
                {isWorkoutStarted &&
                <WebcamPosenetComponent 
                prevRepetitionCount={repetitionCount}
                setRepetitionCount={this.setRepetitionCount}
                ></WebcamPosenetComponent>}
                <ReactPlayer ref= {this.playerRef} 
                className='react-player'
                playing={playing}
                width='28%'
                height='28%'
                muted = {muted}
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={this.handlePlay}
                onPause={this.handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onEnded={this.handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
                controls={false}
                url={url}/>  
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

ExercisePage.propTypes = {
  voice: PropTypes.string, 
  url: PropTypes.string
}

ExercisePage.defaultProps = {
  voice: 'Google UK English Female',
  url: "https://www.youtube.com/watch?v=2pLT-olgUJs"
};