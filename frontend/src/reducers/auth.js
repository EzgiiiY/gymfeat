// frontend/src/reducers/auth.js

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CONFIRMATION_FAIL,
  CONFIRMATION_SUCCESS
} from '../actions/types';
import history from "../history"
const initialState = {
  isLoading: false,
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case REGISTER_SUCCESS:
    case CONFIRMATION_FAIL:
    case CONFIRMATION_SUCCESS:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_SUCCESS: // added
      history.push("/welcome-page");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}