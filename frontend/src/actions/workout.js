import {
    WORKOUT_START_SUCCESS,
    WORKOUT_END_SUCCESS,
    WORKOUT_CHOOSE_FAIL,
    WORKOUT_CHOOSE_SUCCESS,
    EXERCISE_CHOOSE_SUCCESS
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

export const chooseWorkout =(workout) => async (dispatch) => {
  console.log(workout);
  dispatch({
    type: WORKOUT_CHOOSE_SUCCESS,
    payload: workout
  });
}

export const chooseExercise=(exercise) => async (dispatch) => {
  console.log(exercise);
  dispatch({
    type: EXERCISE_CHOOSE_SUCCESS,
    payload: exercise
  });
}