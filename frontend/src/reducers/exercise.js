import {
    EXERCISE_CHOOSE_SUCCESS
} from '../actions/types';

const initialState = {
    exercise:null
};

export default function(state = initialState, action) {
    console.log(action.type)
    console.log(action.payload);
    switch (action.type) {
        case EXERCISE_CHOOSE_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                exercise: action.payload
            };
        default:
          return state;
    }

}
