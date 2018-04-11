import types from '../actions/types';

const DEFAULT_STATE= {
    allEmployees: []
};

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_ALL_EMPLOYEES:
            return {allEmployees: action.payload.data,}
    }
    return state;
}