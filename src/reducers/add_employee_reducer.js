import types from '../actions/types';


export default function (state=[], action){
    switch(action.type){
        case types.ADD_EMPLOYEES:
            return action.payload;
    }
    return state;
}