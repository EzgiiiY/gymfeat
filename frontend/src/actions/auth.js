// frontend/src/actions/auth.js

import { stopSubmit } from 'redux-form';
import Amplify, { Auth } from 'aws-amplify';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CONFIRMATION_SUCCESS,
  CONFIRMATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from '../actions/types';

// LOGOUT USER
export const logout = () => async (dispatch, getState) => {
  await Auth.signOut(); //tokenConfig(getState));
  dispatch({
    type: LOGOUT_SUCCESS
  });
}


// LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  try {
    const res = await Auth.currentAuthenticatedUser();
    dispatch({
      type: USER_LOADED,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// REGISTER USER
export const register = (email, password, username) => async dispatch => {

  try {
    const res = await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    });
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
};
//validate registration code
export const validate = (username, code) => async dispatch => {

  try {
    const res = await Auth.confirmSignUp(username, code);
    dispatch({
      type: CONFIRMATION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CONFIRMATION_FAIL
    });
  }
};



// LOGIN USER
export const login = ({ username, password }) => async dispatch => {

  try {
    const res = await Auth.signIn(username, password);
    const user = await Auth.currentAuthenticatedUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    dispatch(stopSubmit('loginForm', err));
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