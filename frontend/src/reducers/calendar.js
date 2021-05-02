import {
    CALENDAR_UPDATE_SUCCESS,
    CALENDAR_UPDATE_FAIL,
    WORKOUT_END_SUCCESS
} from '../actions/types';

const initialState = {
    currentDate:"",
    exercise:null,
    calendarWorkouts:[]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CALENDAR_UPDATE_SUCCESS:
            return {
                ...state,
                calendarWorkouts:action.payload

            };
        case CALENDAR_UPDATE_FAIL:
        return {
            ...state,
        };
        /*case WORKOUT_END_SUCCESS:
            return{
                dispatch
            }*/
        default:
          return state;
    }

}
