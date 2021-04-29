import {
    EXERCISE_CHOOSE_SUCCESS
} from './types';

export const chooseExercise=(exercise) => async (dispatch) => {
  console.log(exercise);
  dispatch({
    type: EXERCISE_CHOOSE_SUCCESS,
    payload: exercise
  });
}