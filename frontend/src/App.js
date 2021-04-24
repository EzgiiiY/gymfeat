import React, { Component } from 'react';
import MainPage from './components/main-page/main-page'
import HeaderMain from '../src/components/common/header'
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom'; // added
import ExerciseWithSiderPage from './components/exercise-page/exercise-with-sider-page'
import WelcomePage from './components/welcome-page'
import BodyFormPage from './components/body-form-page'
import AboutUsPage from './components/about-us-page'

import history from './history'; // added

import './App.css';
import './styles/css/main.css';
import { Layout, Menu, Breadcrumb, Button, Tabs } from 'antd';

const { TabPane } = Tabs;

const { Header, Content, Footer } = Layout;

const calendarViewLink = (
  <TabPane className='tabs' 
    tab ="Calendar"
    centered= "true"
    key = "calendar"/>
);

const startTodaysWorkout = (
  <TabPane className='tabs' 
    tab ="Start Workout" 
    centered= "true"
    key = "exercise"/>

);

const welcomePage = (
    <TabPane tab = "Home"
    key = "home" 
    centered= "true"
    
    />
);

class App extends Component {
  

  componentDidMount() {
    //store.dispatch(loadUser());
  }
  tabClick(key){
    if(key=="home")
      history.push("/welcome-page")
    else if(key == "exercise")
      history.push("/exercise-page")
    else if( key=="calendar")
      history.push("/main-page")
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header> <HeaderMain /> </Header>
          <Tabs defaultActiveKey="home"
            onTabClick={this.tabClick}
            className='tabs' 
            >
            {welcomePage}
            {calendarViewLink}
            {startTodaysWorkout}
          </Tabs>
          <Content style={{ padding: '0 24px', minHeight: 680 }} >
            <Switch>
            <Route path='/welcome-page'>
                  <WelcomePage/>
              </Route>
              <Route path='/main-page'>
                  <MainPage/>
              </Route>      
              <Route path='/exercise-page'>
                  <ExerciseWithSiderPage/>
              </Route> 
              <Route path='/body-form-page'>
                  <BodyFormPage/>
              </Route> 
              <Route path='/about-us'>
                  <AboutUsPage/>
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
