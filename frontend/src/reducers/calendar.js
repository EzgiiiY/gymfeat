import {
    CALENDAR_UPDATE_SUCCESS,
    CALENDAR_UPDATE_FAIL
} from '../actions/types';

const initialState = {
    isWorkoutCompleted: false,
    currentDate:"",
    exercise:null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CALENDAR_UPDATE_SUCCESS:
            return {
                ...state,
            };
        case CALENDAR_UPDATE_FAIL:
        return {
            ...state,
        };
        default:
          return state;
    }

}
