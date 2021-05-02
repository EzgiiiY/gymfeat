import { Calendar, Alert,Badge } from 'antd';
import moment from 'moment';
import React from 'react';
import './calendar.css';
import {getUserWorkouts,deleteUserWorkout} from "../../actions/calendar"
import { connect } from 'react-redux';
import workouts from '../../data/workouts.json'

class CalendarComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentContent: "",
      dateValues:[],
      workouts:[],
      listData:[]
    };
    this.getDateValues=this.getDateValues.bind(this);
  }
  componentDidMount(){
    this.getDateValues()
  }
   async getDateValues(){
    await this.props.getUserWorkouts();
    let workoutsArr = this.props.workoutsList
    console.log(workoutsArr)
    this.setState({workouts:workoutsArr});
    
  }

  convertWorkoutListData(){
    let dateWorkoutArr = new Array();
    
    let currWorkout 
    for(let i = 0; i < this.state.workouts.length;i++){
      var item = this.state.workouts[i];
      currWorkout = workouts.filter(function (workout) {
        return workout.id === item.workout_id;
      });
      dateWorkoutArr.push({date:item.date,workout:currWorkout})
    }
    return dateWorkoutArr;
  }
  
  
  dateCellRender = value => {
    let listData = this.convertWorkoutListData();
    let dateValues = new Array();
    for(let i = 0; i<listData.length;i++){
      var item = listData[i];
      var val = value.format("YYYY.MM.DD")
      if(val===item.date){
        for(let j = 0 ; j < item.workout.length;j++){
          let exercise = item.workout[j];
          dateValues.push(
            <li key={value.format("DD.MM.YYYY")}>
              <Badge status="success" text={exercise.workoutName} />
            </li>
          );
        }
       
      }
    }
    return (
      <ul className="events">
        {dateValues}
      </ul>
    );
  }
  onSelect = value => {
    let listData = this.convertWorkoutListData();

    console.log(value)
    let exercisesArr = new Array();

    for(let i = 0; i<listData.length;i++){
      var item = listData[i];
      var val = value.format("YYYY.MM.DD")
      if(val===item.date){
        exercisesArr.push(item.workout);
       
      }
    }

    this.setState({
      selectedValue: value,
    });
    this.props.onClick(exercisesArr);
    this.props.getDate(value.format('DD.MM.YYYY'));
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Calendar dateCellRender={this.dateCellRender}  
        value={value} 
        onSelect={this.onSelect} 
        onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    workoutsList: state.calendar.calendarWorkouts
  };
}


export default connect(mapStateToProps,{deleteUserWorkout,getUserWorkouts})(CalendarComponent);