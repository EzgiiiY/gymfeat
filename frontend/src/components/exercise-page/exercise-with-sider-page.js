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

const { Option } = Select;
const { Sider } = Layout;
const { SubMenu } = Menu;

export default class ExerciseWithSiderPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
           isHidden : false,
           muted: false,
           warningsOn: true,
           isExited: false,
        };
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

    handleSetCountChange = (value) => {
      console.log(`selected ${value}`);
    }

    render() {
        const { isHidden, muted, warningsOn, isExited } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={isHidden} onCollapse={this.onHide}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                      <Select placeholder="Set Count"
                        style={{ width:150 }} onChange={this.handleSetCountChange}>
                        <Option value="1">Set Count: 1</Option>
                        <Option value="2">Set Count: 2</Option>
                        <Option value="3">Set Count: 3</Option>
                        <Option value="4">Set Count: 4</Option>
                        <Option value="5">Set Count: 5</Option>
                      </Select>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Select placeholder="Repetition Count"
                        style={{ width:150 }} onChange={this.handleSetCountChange}>
                        <Option value="1">Repetition: 10</Option>
                        <Option value="2">Repetition: 15</Option>
                        <Option value="3">Repetition: 20</Option>
                        <Option value="4">Repetition: 25</Option>
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
              handleExit={this.handleExit}>
              </ExercisePage>}
              {isExited &&
              <ExerciseFinishedPage>
              </ExerciseFinishedPage>
              }
            </Layout>
        );
    }
    

}

/*
<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
*/