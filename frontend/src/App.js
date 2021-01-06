import React, { Component } from 'react';
import MainPage from './components/main-page/main-page'
import HeaderMain from '../src/components/common/header'
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom'; // added


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

          <Content >
            <Switch>
            <Route path='/main-page'>
                <MainPage/>
            </Route>      
           {/* <Route path='/home'>
                <HomePage/>
            </Route> */
          }    
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
