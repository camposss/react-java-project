import types from '../actions/types';


export default function (state=[], action){
    switch(action.type){
        case types.DELETE_EMPLOYEE:
            return action.payload;
    }
    return state;
}