import { Result, Button } from 'antd';
import React from 'react'
import {Link} from 'react-router-dom'
import { SmileOutlined } from '@ant-design/icons';

import './exercise-finished-page.css'

export default class ExerciseFinishedPage extends React.Component{


    render(){
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