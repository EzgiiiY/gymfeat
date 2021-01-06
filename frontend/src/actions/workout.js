import {
    WORKOUT_START_SUCCESS,
    WORKOUT_END_SUCCESS,
} from './types';

export const startWorkout =() => async (dispatch) => {
    dispatch({
      type: WORKOUT_START_SUCCESS
    });
}

export const endWorkout =() => async (dispatch) => {
    dispatch({
      type: WORKOUT_END_SUCCESS
    });
}