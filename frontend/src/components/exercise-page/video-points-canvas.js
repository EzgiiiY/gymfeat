import React from 'react';
import { drawVideoKeypoints, drawVideoSkeleton } from "./utils";
import pose0 from '../../data/actual_keypoints.json'
import pose1 from '../../data/1.json'

export default class VideoPointsCanvas extends React.Component{

    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
        this.drawResult = this.drawResult.bind(this);
    }

    componentDidMount(){
        const {exerciseLabel, animationPlayRate} = this.props;
        if(exerciseLabel == 0){
            var i = 0;
            setInterval(() => {
                i = this.drawResult(pose0, this.canvasRef, i);
            }, animationPlayRate);
        } else if(exerciseLabel == 1){
            var i = 0;
            setInterval(() => {
                i = this.drawResult(pose1, this.canvasRef, i);
            }, animationPlayRate);
        }
    }

    drawResult = (pose, canvas, i) => {
        var ind = '' + i;
        var cur = pose[ind]
        if(canvas && canvas.current){
            const ctx = canvas.current.getContext("2d");
            const width = canvas.current.width;
            const height = canvas.current.height;
            ctx.clearRect(0, 0, width, height);
            drawVideoKeypoints(cur, 0.6, ctx, width, height);
            drawVideoSkeleton(cur, 0.6, ctx, width, height);
        }
        if(i < Object.keys(pose).length - 1){
            i +=1;
            return i;
        } else{
            return 0;
        }
    };

    render(){
        return(
            <div>
                <canvas
                ref={this.canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "0",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                }}
                />
            </div>
        );
    }
}