import React, { Component } from 'react';
import MainPage from './components/main-page/main-page'
import HeaderMain from '../src/components/common/header'
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom'; // added
import ExercisePage from './components/exercise-page/exercise-page'
import WelcomePage from './components/welcome-page'
import BodyFormPage from './components/body-form-page'

import history from './history'; // added

import './App.css';
import './styles/css/main.css';
import { Layout, Menu, Breadcrumb, Button, Tabs } from 'antd';

const { TabPane } = Tabs;

const { Header, Content, Footer } = Layout;

const calendarViewLink = (
  <TabPane tab ={<Link to='/main-page'>Calendar</Link>}
     key = "calendar"></TabPane> 
);

const startTodaysWorkout = (
    <TabPane tab ={<Link to='/exercise-page' className='tabs'>Start Workout</Link>}
    key = "exercise"></TabPane>
);

const welcomePage = (
    <TabPane tab = {<Link to='/welcome-page' className='tabs'>Home</Link>} 
    key = "home" centered= "true"></TabPane>
);

class App extends Component {
  

  componentDidMount() {
    //store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header> <HeaderMain /> </Header>
          <Tabs defaultActiveKey="home">
            {welcomePage}
            {calendarViewLink}
            {startTodaysWorkout}
          </Tabs>
          <Content style={{ padding: '0 24px', minHeight: 680 }} >
            <Switch>
              <Route path='/main-page'>
                  <MainPage/>
              </Route>      
              <Route path='/welcome-page'>
                  <WelcomePage/>
              </Route>
              <Route path='/exercise-page'>
                  <ExercisePage/>
              </Route> 
              <Route path='/body-form-page'>
                  <BodyFormPage/>
              </Route> 
            </Switch>
          </Content>
          <Footer className='App-footer' style={{ textAlign: 'center'}}>
            
          </Footer>
        </Router>
      </Provider>
    );
  }
};

export default App;
