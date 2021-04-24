import React, { Component } from 'react';
import {DatePicker, Input, Button, Form, message} from 'antd';
import {Checkbox, Select} from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { DownOutlined} from '@ant-design/icons';

import './body-form-page.css'

const { Option } = Select;

class BodyFormPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
                    date: '',
                    workoutGoal: '',
                    workoutPastFrequency: '',
                    workoutCurrentFrequency: '',
                };
        this.setDate = this.setDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleWorkoutGoalSelect = this.handleWorkoutGoalSelect.bind(this);
        this.handlePastWorkoutFreqSelect = this.handlePastWorkoutFreqSelect.bind(this);
        this.handleCurWorkoutFreqSelect = this.handleCurWorkoutFreqSelect.bind(this);
    }

    setDate(value){
        this.setState({ date: value });
    }

    setWorkoutGoal(value){
        this.setState({ workoutGoal: value });
    }

    setPastWorkoutFrequency(value){
        this.setState({ workoutPastFrequency: value });
    }

    setCurWorkoutFrequency(value){
        this.setState({ workoutCurFrequency: value });
    }

    handleChange = value => {
        message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        
        console.log(value)
        this.setDate(value.format('YYYY-MM-DD'));
        console.log("Date: " + this.state.date);
    };

    handleWorkoutGoalSelect = value => {
        message.info(`Selected Workout Goal: ${value}`);
        this.setWorkoutGoal(value);
    }

    handlePastWorkoutFreqSelect = value => {
        message.info(`How often did you exercise: ${value}`);
        this.setPastWorkoutFrequency(value);
    }

    handleCurWorkoutFreqSelect = value => {
        message.info(`How often do you want to exercise: ${value}`);
        this.setCurWorkoutFrequency(value);
    }

    onFinish = (fieldsValue) => {
        const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        };
        console.log('Received values of form: ', values);
    };

    onSubmit = formValues => {
        
    };    

    render() {
        return(
            <div className='post-job-form-container'>
                <div className='job-form-container'>
                    <Form className="job-form"
                        onFinish={values => this.onSubmit(values)}
                        scrollToFirstError
                    >
                        <Form.Item className='job-item'
                            label="Enter your nickname:"
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Enter your weight:"
                            name="weight"
                        >
                            <Input.Group compact>
                                <Select defaultValue="kg" style={{ width: '20%' }}>
                                    <Option value="kg">kg</Option>
                                    <Option value="lb">lb</Option>
                                </Select>
                                <Input
                                    style={{ width: '70%' }}
                                    placeholder="Weight"
                                />
                            </Input.Group>
                        </Form.Item>
                        <Form.Item className='job-item'
                            label="Enter your height:"
                            name="height"
                        >
                            <Input.Group compact>
                                <Select defaultValue="m" style={{ width: '20%' }}>
                                    <Option value="m">m</Option>
                                    <Option value="ft">ft</Option>
                                </Select>
                                <Input
                                    style={{ width: '70%' }}
                                    placeholder="Height"
                                />
                            </Input.Group>
                        </Form.Item>
                        <Form.Item className='job-item' label="Enter your gender:">
                            <Select>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="none">I choose not to disclose.</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="date-picker-checkbox" label="Enter your birthday:">
                            <DatePicker onChange={this.handleChange}/>
                        </Form.Item>
                        <Form.Item>
                            <Select 
                                placeholder='Choose Your Workout Goal' 
                                onChange={this.handleWorkoutGoalSelect}>
                                <Option value="lose weight">Lose Weight</Option>
                                <Option value="strengthen">Strengthen</Option>
                                <Option value="none">Buluruz daha</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Select 
                                placeholder='How often do you exercise (until now)?' 
                                onChange={this.handlePastWorkoutFreqSelect}>
                                <Option value="almost zero">0 - 1 times a week</Option>
                                <Option value="two three">2 - 3 times a week</Option>
                                <Option value="four five">4 - 5 times a week</Option>
                                <Option value="six or more">6+ times a week</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Select 
                                placeholder='How often do you want to exercise?' 
                                onChange={this.handleCurWorkoutFreqSelect}>
                                <Option value="almost zero">1 time a week</Option>
                                <Option value="two three">2 - 3 times a week</Option>
                                <Option value="four five">4 - 5 times a week</Option>
                                <Option value="six or more">6+ times a week</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item className="checkbox">
                            <Checkbox>Would you like to get e-mails from us?</Checkbox>
                        </Form.Item>
                        <Form.Item className='job-item'
                        wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                        }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({

});
  
BodyFormPage = connect(
    mapStateToProps,
)(BodyFormPage);
export default connect(mapStateToProps)(BodyFormPage);
