import {
    WORKOUT_START_SUCCESS,
    WORKOUT_END_SUCCESS,
} from '../actions/types';

const initialState = {
    isWorkoutStarted: false,
};

export default function(state = initialState, action) {
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
        default:
          return state;
    }

}
