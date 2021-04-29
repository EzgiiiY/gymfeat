import React, { Component } from 'react';
import MainPage from './components/main-page/main-page'
import HeaderMain from '../src/components/common/header'
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import ExerciseWithSiderPage from './components/exercise-page/exercise-with-sider-page'
import WelcomePage from './components/welcome-page'
import BodyFormPage from './components/body-form-page'
import AboutUsPage from './components/about-us-page'
import CustomTabs from './components/common/CustomTabs'
import ProfilePage from './components/profile-page/ProfilePage'
import SignUp from './components/registeration/SignUp'
import SingleExerciseListPage from './components/workout-list-page/single-exercise-list-page'
import WorkoutListPage from './components/workout-list-page/workout-list-page'
import history from './history';

import './App.css';
import './styles/css/main.css';
import { Layout, Menu, Breadcrumb, Button,  Dropdown } from 'antd';


const { Header, Content, Footer } = Layout;

class App extends Component {
  

  componentDidMount() {
    //store.dispatch(loadUser()); //uncomment when auth actions is ready
  }
  
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header> <HeaderMain /> </Header>
            <CustomTabs/>
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
              <Route path="/profile">
                  <ProfilePage/>
              </Route>
              <Route path="/signUp">
                  <SignUp/>
              </Route>
              <Route path="/exerciseList">
                <SingleExerciseListPage/>
              </Route>
              <Route path="/workoutList">
                <WorkoutListPage/>
              </Route>
              <Redirect to="/welcome-page"/>
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
