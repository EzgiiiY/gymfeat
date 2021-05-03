import { Result, Button, List, Typography } from 'antd';
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
        this.state = {
            showResults: false,
         };
         this.handleClickTrue = this.handleClickTrue.bind(this);
         this.handleClickFalse = this.handleClickFalse.bind(this);
    }
    

    componentDidMount()
    {
        this.props.addtoDB(moment().format("YYYY.MM.DD"),this.props.workout.workout.id)
    }

    handleClickTrue(){
        this.setState({
            showResults: true,
        });
    }
    handleClickFalse(){
        this.setState({
            showResults: false,
        });
    }
    

    render(){
        console.log(this.props.workout)
        const {analysisMessage} = this.props;
        const {showResults} = this.state;
        console.log(analysisMessage)
        console.log('show resuls ' + showResults)
        return(
            <div className="modal">
                {<Result
                icon={<SmileOutlined />}
                title="Workout Completed!"
                subTitle='You are doing great!'
                extra={[
                <Button type="primary" key="resultsTrue" disabled={showResults} onClick={this.handleClickTrue}>
                    See Results
                </Button>,
                <Button type="primary" key="resultsTrue" disabled={!showResults} onClick={this.handleClickFalse}>
                    Hide Results
                </Button>,
                <Link to='/main-page'>
                    <Button type="primary" key="calendar">
                        Go back to Calendar!
                    </Button>
                </Link>,
                ]}
                />}
                {showResults && <List
                className='list_content'
                dataSource={analysisMessage}
                renderItem={item => (
                    <List.Item>
                     {item}
                    </List.Item>
                )}/>}
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