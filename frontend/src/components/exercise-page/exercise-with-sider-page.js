import React from 'react';
import { connect } from 'react-redux';
import '../../reducers/workout';
import { Layout, Menu, Switch, Divider, Dropdown, Button } from 'antd';
import ExercisePage from './exercise-page';
import {NavLink} from 'react-router-dom'
import ExerciseFinishedPage from './exercise-finished-page'
import {
    WarningOutlined,
    UserOutlined,
    AudioMutedOutlined,
    SettingOutlined,
  } from '@ant-design/icons';
import { Select } from 'antd';
import workout from '../../reducers/workout';

const { Option } = Select;
const { Sider } = Layout;
const { SubMenu } = Menu;

class ExerciseWithSiderPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
           isHidden : false,
           muted: false,
           warningsOn: true,
           isExited: false,
           totSetCount: 1,
           totRepetitionCount: 10,
           animationPlayRate: 300,
           analysisMessage: [],
        };
    }

    componentDidMount = () => {
      const height = this.props.user.attributes["custom:height"];
      const weight = this.props.user.attributes["custom:weight"];
      const bmi = ( weight / height / height ) * 10000;
      var idealReps = "10";
      var idealSet = "1";
      var playRate =  300;
      setTimeout(() => {
        if(bmi < 18.5){ //underweight
          idealReps = "15";
          idealSet = "2";
          playRate =  400;
        } else if(bmi < 25){ //normal
          idealReps = "15";
          idealSet = "3";
          playRate =  250;
        } else if(bmi < 30) { //overweight
          idealReps = "10";
          idealSet = "4";
          playRate =  400;
        } else{ //obese
          idealReps = "5";
          idealSet = "5";
          playRate =  500;
        }
        this.handleRepetitionCountChange(idealReps);
        this.handleSetCountChange(idealSet);
        this.handleAnimationRateChange(playRate);
      }, 50);
    }

    onHide = isHidden => {
        this.setState({ 
          isHidden: isHidden });
    };

    onSwitchWarning = warningsOn =>{
      this.setState({ 
        warningsOn: warningsOn });
    };

    onSwitchMute = muted =>{
      this.setState({ 
        muted: muted, 
      });
    };

    handleExit = () => {
      this.setState({
        isExited: true,
      });
    }

    handleAnimationRateChange = (value) => {
      this.setState({
        animationPlayRate: value,
      });
    }

    handleSetCountChange = (value) => {
      console.log(`selected ${value}`);
      this.setState({
        totSetCount: parseInt(value),
      });
    }

    handleRepetitionCountChange = (value) => {
      this.setState({
        totRepetitionCount: parseInt(value),
      });
    }

    initializeAnalysisMessage = () => {
      this.setState({
        analysisMessage: ["You're doing great. Here is your score:", 
        'Squat 5/5', 'Right Side Lunge 5/5', 'If you don\'t see the full list, you didn\'t complete the workout.'],
      });
    }

    addMessage = (message) => {
      this.setState({
        analysisMessage: this.state.analysisMessage.concat(message),
      });
    }
    

    render() {
        const { isHidden, muted, warningsOn, isExited, 
          totSetCount, totRepetitionCount, analysisMessage, animationPlayRate } = this.state;
        const totRepetitionCountStr = "" + totRepetitionCount;
        const totSetCountStr = "" + totSetCount;
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={isHidden} onCollapse={this.onHide}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="0">
                  {this.props.workout.workout.workoutName}
                </Menu.Item>
                <Menu.Item key="1" icon={<WarningOutlined />}>
                    AI Warnings 
                    <Divider type="vertical" />
                    <Switch defaultChecked onChange={this.onSwitchWarning} />
                </Menu.Item>
                <Menu.Item key="2" icon={<AudioMutedOutlined />}>
                    Mute Video
                    <Divider type="vertical" />
                    <Switch onChange={this.onSwitchMute} />
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                  <NavLink to='/profile'>
                  Profile
                  </NavLink>
                </Menu.Item>
                <SubMenu key="sub1" icon={<SettingOutlined />} title="Workout Settings">
                    <Menu.Item key="4">
                      <Select defaultValue={totSetCountStr}
                        style={{ width:150 }} onChange={this.handleSetCountChange}>
                        <Option value="1">Set Count: 1</Option>
                        <Option value="2">Set Count: 2</Option>
                        <Option value="3">Set Count: 3</Option>
                        <Option value="4">Set Count: 4</Option>
                        <Option value="5">Set Count: 5</Option>
                      </Select>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Select defaultValue={totRepetitionCountStr}
                        style={{ width:150 }} onChange={this.handleSetCountChange}>
                        <Option value="5">Repetition:  5</Option>
                        <Option value="10">Repetition: 10</Option>
                        <Option value="15">Repetition: 15</Option>
                        <Option value="20">Repetition: 20</Option>
                        <Option value="25">Repetition: 25</Option>
                      </Select>
                    </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
              {!isExited &&
              <ExercisePage 
              voice = 'Google UK English Male'
              muted={muted}
              warningsOn={warningsOn}
              handleExit={this.handleExit}
              totSetCount={totSetCount}
              totRepetitionCount={totRepetitionCount}
              exit={this.handleExit}
              initializeAnalysisMessage={this.initializeAnalysisMessage}
              addMessage={this.addMessage}
              animationPlayRate={animationPlayRate}
              >
              </ExercisePage>}
              {isExited &&
              <ExerciseFinishedPage analysisMessage={analysisMessage}>
              </ExerciseFinishedPage>
              }
            </Layout>
        );
    }
    

}

const mapStateToProps =state=>{
  return{
    workout: state.workout,
    user: state.auth.user,
  };
}

ExerciseWithSiderPage = connect(
  mapStateToProps,
)(ExerciseWithSiderPage);
export default connect(mapStateToProps)(ExerciseWithSiderPage)
/*
<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
*/