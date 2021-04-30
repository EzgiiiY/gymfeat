import {
    WORKOUT_START_SUCCESS,
    WORKOUT_END_SUCCESS,
    WORKOUT_CHOOSE_SUCCESS,
    WORKOUT_CHOOSE_FAIL,
    EXERCISE_CHOOSE_SUCCESS
} from '../actions/types';
import workouts from '../data/workouts.json'

const initialState = {
    isWorkoutStarted: false,
    workout:workouts[0],
    exercise:null
};

export default function(state = initialState, action) {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case WORKOUT_START_SUCCESS:
            return {
                ...state,
                isWorkoutStarted: true
            };
        case WORKOUT_END_SUCCESS:
            return {
                ...state,
                isWorkoutStarted: false
            };
        case WORKOUT_CHOOSE_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                isWorkoutStarted: false,
                exercise:null,
                workout: action.payload
            };
        case EXERCISE_CHOOSE_SUCCESS:
        console.log(action.payload)
        return {
            ...state,
            isWorkoutStarted: false,
            exercise: action.payload,
            workout: null
        };
        default:
          return state;
    }

}
