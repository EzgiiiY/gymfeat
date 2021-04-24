// frontend/src/actions/auth.js

import axios from 'axios';
import { stopSubmit } from 'redux-form';

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from '../actions/types';

const backend = "http://127.0.0.1:8000"
// LOGOUT USER
export const logout =() => async (dispatch, getState) => {
    await axios.post(backend+'/api/auth/logout', null, tokenConfig(getState));
    dispatch({
      type: LOGOUT_SUCCESS
    });
}
  

// LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const res = await axios.get(backend+'/api/auth/user', tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// REGISTER USER
export const register = ({company="",email,password,username,first_name,last_name, position=""},type) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if(type === "employer"){
    // Request Body
    const user = {email,password,username,first_name,last_name};
    const body = JSON.stringify({company,user});

    try {
      const res = await axios.post(backend+'/api/auth/register'+type, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch(stopSubmit('registerForm', err.response.data));
    }

  }
  else if(type === "employee"){
    const user = {email,password,username,first_name,last_name};
    const body = JSON.stringify({company,position,user});
    // Request Body
    try {
      const res = await axios.post(backend+'/api/auth/register'+type, body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL
      });
      dispatch(stopSubmit('registerForm', err.response.data));
    }
  }
};


// LOGIN USER
export const login = ({ username, password }, type) => async dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(type);
  // Request Body
  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(backend+'/api/auth/login'+type, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    dispatch(stopSubmit('loginForm', err.response.data));
  }
};

// helper function
export const tokenConfig = getState => {
  // Get token
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};