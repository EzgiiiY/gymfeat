import WebcamPosenetComponent from './webcam-posenet-page';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../reducers/workout';
import { startWorkout, endWorkout } from '../../actions/workout';
import SpeechRecognizerPopup from './speech'
import ReactPlayer from "react-player"
import './webcam-page.css';

class ExercisePage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isWorkoutStarted: false,
            playing: false,
            startingFrom: 43, //starting from 43rd
        };
        this.startWorkout = this.startWorkout.bind(this);
        this.playerRef = React.createRef();
    }


    startWorkout = () => {
        this.setState({
            isWorkoutStarted: true,
            playing: true,
        });
        this.playerRef.current.seekTo(43);

        console.log(window.speechSynthesis.getVoices());
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
    
      handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
      }
    
      handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
      }
    
      handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
      }
    
      handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
      }
    
      handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
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
        console.log('onProgress', state)
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
        const {isWorkoutStarted, playing} = this.state;
        const {voice} = this.props;
        return(
            <div className='webcam-container'>
                {!isWorkoutStarted &&<SpeechRecognizerPopup 
                startWorkout={this.startWorkout}
                voice = {voice}/> 
                }
                <WebcamPosenetComponent isWorkoutStarted={isWorkoutStarted}></WebcamPosenetComponent>
                <ReactPlayer ref= {this.playerRef} 
                className='react-player'
                playing={playing}
                width='33%'
                height='33%'
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={this.handlePlay}
                onEnablePIP={this.handleEnablePIP}
                onDisablePIP={this.handleDisablePIP}
                onPause={this.handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onEnded={this.handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
                controls={false}
                url="https://www.youtube.com/watch?v=2pLT-olgUJs"/>  
            </div>
        );
    }

    //{!isWorkoutStarted && <SpeechRecognizerPopup startWorkout={this.startWorkout}/> }
}

/*
*/

const mapStateToProps = state => ({
    //isWorkoutStarted: state.isWorkoutStarted,
});

ExercisePage = connect(
    mapStateToProps,
    {startWorkout},
  )(ExercisePage);
export default connect(mapStateToProps)(ExercisePage);

ExercisePage.propTypes = {
  voice: PropTypes.string
}

ExercisePage.defaultProps = {
  voice: 'Google UK English Female'
};