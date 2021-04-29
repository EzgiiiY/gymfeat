import {
    WORKOUT_START_SUCCESS,
    WORKOUT_END_SUCCESS,
    WORKOUT_CHOOSE_SUCCESS,
    WORKOUT_CHOOSE_FAIL
} from '../actions/types';

const initialState = {
    isWorkoutStarted: false,
    workout:null
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
                workout: action.payload
            };
        default:
          return state;
    }

}
