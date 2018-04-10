import types from '../actions/types';

const DEFAULT_STATE= {
    employees: [],
};

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_EMLOYEES:
            return {employees: action.payload};
    }
    return state;
}