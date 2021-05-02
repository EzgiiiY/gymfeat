import { Result, Button } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom'
import { SmileOutlined } from '@ant-design/icons';
import {addtoDB} from "../../actions/calendar"
import './exercise-finished-page.css'
import { connect } from 'react-redux';
import moment from 'moment';

class ExerciseFinishedPage extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount()
    {
        this.props.addtoDB(moment().format("YYYY.MM.DD"),this.props.workout.workout.id)
    }


    render(){
        console.log(this.props.workout)
        const {analysisMessage} = this.props;
        return(
            <div className="modal">
                {<Result
                icon={<SmileOutlined />}
                title="Workout Completed!"
                subTitle={"You are doing great. " + analysisMessage}
                extra={[
                <Link to='/main-page'>
                    <Button type="primary" key="calendar">
                        Go back to Calendar!
                    </Button>
                </Link>,
                ]}
                />}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
      user: state.auth.user,
      workout: state.workout
    };
  }
  

  
  export default connect(mapStateToProps,{addtoDB})(ExerciseFinishedPage);