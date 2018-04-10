import types from '../actions/types';


export default function (state=[], action){
    switch(action.type){
        case types.UPDATE_EMPOYEE:
            return action.payload;
    }
    return state;
}