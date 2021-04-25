import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import React from 'react';
import { drawKeypoints, drawSkeleton } from "./utils";
import { connect } from 'react-redux';

class WebcamPosenetComponent extends React.Component{

    constructor(props){
        super(props);
        this.webcamRef = React.createRef();
        this.canvasRef = React.createRef();
        this.runPosenet = this.runPosenet.bind(this);
        this.detectWebcamFeed = this.detectWebcamFeed.bind(this);
        this.drawResult = this.drawResult.bind(this);
        this.websocket = new WebSocket("ws://127.0.0.1:5678/"); // this guy should be in the format 'ws://HOST:PORT'. host and the port is specified in the python file.
        this.websocket.onmessage = (e) => { // run this function every time socket receives something from the python file
            var server_message = e.data;
            console.log("received from server: ", server_message);
         }
    }

    componentDidMount(prevProps) {
        this.runPosenet(); 
    }

    detectWebcamFeed = async (posenet_model) => {
        if (
          typeof this.webcamRef.current !== "undefined" &&
          this.webcamRef.current !== null &&
          this.webcamRef.current.video.readyState === 4
        ) {
          // Get Video Properties
          const video = this.webcamRef.current.video;
          const videoWidth = this.webcamRef.current.video.videoWidth;
          const videoHeight = this.webcamRef.current.video.videoHeight;
          // Set video width
          this.webcamRef.current.video.width = videoWidth;
          this.webcamRef.current.video.height = videoHeight;

          // Make Estimation
          const pose = await posenet_model.estimateSinglePose(video,0.5,false,16);
          console.log("pose: ", pose);
          if (this.websocket.readyState === WebSocket.OPEN) {
            // if websocket is ready to send, turn the pose object into string and send the corresponding string to the python file
            pose["type"] = 0
            this.websocket.send(JSON.stringify(pose)); 
          }
          this.drawResult(pose, video, videoWidth, videoHeight, this.canvasRef);
        
        }
    };

    runPosenet = async () => {
        const posenet_model = await posenet.load({
            architecture: 'MobileNetV1',
            //inputResolution: { width: 640, height: 480 },

        });
        //
        setInterval(() => {
          this.detectWebcamFeed(posenet_model);
        }, 100);
    };

    drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
        if(canvas && canvas.current){
            const ctx = canvas.current.getContext("2d");
            canvas.current.width = videoWidth;
            canvas.current.height = videoHeight;
            drawKeypoints(pose["keypoints"], 0.6, ctx);
            drawSkeleton(pose["keypoints"], 0.7, ctx);
        }
    };

    render(){
        console.log('hello');
        return(
            <div>
                <Webcam
                ref={this.webcamRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                }}
                />
                <canvas
                ref={this.canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                }}
                />
            </div>
        );
    }
}

export default WebcamPosenetComponent;