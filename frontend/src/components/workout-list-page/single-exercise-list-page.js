import React from 'react';
import { connect } from 'react-redux';
import '../../reducers/workout';
import { Layout, Menu, Switch, Divider, Dropdown, Button } from 'antd';
import {NavLink} from 'react-router-dom'
import { List, message, Avatar, Spin } from 'antd';
import {
    WarningOutlined,
    UserOutlined,
    AudioMutedOutlined,
    SettingOutlined,
  } from '@ant-design/icons';
import { Select } from 'antd';
import exercises from '../../data/exercises.json'
import './single-exercise-list-page.css'
import {chooseExercise} from '../../actions/workout'

const { Option } = Select;
const { Sider } = Layout;
const { SubMenu } = Menu;

/*
const ExerciseList = (exercises) =>{
    return  (
        <List
        dataSource={exercises}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href={item.Link}>{item.Name}</a>}
              description={item.Start}
            />
            <div>Content</div>
          </List.Item>
        )}
      >
      </List>
    );
} */

const  ExerciseList = exercises.map( ( data) =>{
  return  (
      <List.Item>
        {data.Name}
      </List.Item>
  )
} );
class SingleExerciseListPage extends React.Component {

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
      this.props.chooseExercise(item);
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
                <Menu.Item key="1" >
                  <NavLink to='/workoutList'>
                    Workouts
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to='/exerciseList'>
                    Single Exercises
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <div className='container'>
              <List
                  dataSource={exercises}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={<Button onClick={(e)=>this.handleClick(e,item)} >{item.Name}</Button>}
                      />
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
    chooseExercise: (item) => dispatch(chooseExercise(item))
  }
}
const mapStateToProps =state=>{
  return{
    exercise: state.exercise
  };
}
SingleExerciseListPage = connect(
  mapStateToProps,mapDispatchToProps,
)(SingleExerciseListPage);
export default connect(mapStateToProps, mapDispatchToProps)(SingleExerciseListPage)