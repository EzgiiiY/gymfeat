// frontend/src/reducers/index.js

import { LOGOUT_SUCCESS } from '../actions/types'; // added
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from './auth';
import workout from './workout';
import exercise from './exercise';
// export default combineReducers({
//   form: formReducer,
//   todos,
//   auth
// });

const appReducer = combineReducers({
  form: formReducer,
  auth,
  workout,
  exercise,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;