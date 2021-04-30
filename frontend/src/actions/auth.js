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
export const register = (username,password,values) => async dispatch => {
  let email=values.email
  let weight = values.weight
  let height = values.height
  let weightUnit = values.weightUnit
  let heightUnit =values.heightUnit
  let gender=values.gender
  let birhday=values.birhday
  let goal = values.workoutGoal
  let freqSoFar=values.workoutPastFrequency
  let freqDesired=values.workoutCurrentFrequency
  try {
    const res = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        "custom:weight":weight,
        "custom:height":height,
        "custom:weightUnit":weightUnit,
        "custom:heightUnit":heightUnit,
        "custom:gender":gender,
        "custom:birhday":birhday,
        "custom:goal":goal,
        "custom:freqSoFar":freqSoFar,
        "custom:freqDesired":freqDesired
      }
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
    dispatch(stopSubmit('registerForm', err));
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
    console.log(err)
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