import React from 'react';
import { connect } from 'react-redux';
import '../../reducers/workout';
import { Layout, Menu, Switch, Divider, Dropdown, Button } from 'antd';
import {NavLink} from 'react-router-dom'
import { Card, List, message, Avatar, Spin } from 'antd';
import {
    WarningOutlined,
    AudioMutedOutlined,
  } from '@ant-design/icons';
import { Select } from 'antd';
import workouts from '../../data/workouts.json'
import './workout-list-page.css';
import {chooseWorkout} from '../../actions/workout'

const { Option } = Select;
const { Sider } = Layout;
const { SubMenu } = Menu;


class WorkoutListPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          isHidden : false,
       };
    }

    onHide = isHidden => {
        this.setState({ 
          isHidden: isHidden });
    };
    handleClick(e,item){
      e.preventDefault();
     
      console.log(item);
      this.props.chooseWorkout(item);
      //console.log(this.props);
    }
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

    render() {
      
      console.log(this.props)
        const { isHidden } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                  <NavLink to='/workoutList'>
                    Workouts
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2" >
                  <NavLink to='/exerciseList'>
                    Single Exercises
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <div className='container'>
              <List
                  dataSource={workouts}
                  grid={{ gutter: 16, column: 3 }}
                  renderItem={item => (
                    <List.Item key={item.id}>
                  <Button onClick={(e)=>this.handleClick(e,item)}>{item.workoutName}</Button>
                      <List
                      dataSource={item.exerciseList} 
                      renderItem={exercise => (
                        <List.Item key={exercise.id}>
                            <List.Item.Meta
                            title={exercise.Name}
                            />
                        </List.Item>
                      )}
                      >
                      </List>
                    </List.Item>
                  )}
                >
                </List>
            </div>

            </Layout>
        );
    }
}

const mapDispatchToProps=dispatch=>{
  console.log('IN mapDispatchToProps')
  return {
    chooseWorkout: (item) => dispatch(chooseWorkout(item))
  }
}
const mapStateToProps =state=>{
  return{
    workout: state.workout
  };
}
WorkoutListPage = connect(
  mapStateToProps,mapDispatchToProps,
)(WorkoutListPage);
export default connect(mapStateToProps, mapDispatchToProps)(WorkoutListPage)