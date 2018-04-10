import types from '../actions/types';

// const DEFAULT_STATE= {
//     employees: [],
// };

export default function(state=[], action){
    switch(action.type){
        case types.GET_SINGLE_EMPLOYEE:
            return action.payload.data;
        case types.GET_EMLOYEES:
            return action.payload.data;
    }
    return state;
}