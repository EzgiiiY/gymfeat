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
import { Layout, Menu, Breadcrumb, Button } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component {
  

  componentDidMount() {
    //store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header> <HeaderMain /> </Header>
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
