import types from '../actions/types';

const DEFAULT_STATE= {
    employees: [],
    pageInfo: {},
    allEmployees: []
};

export default function(state=DEFAULT_STATE, action){
    switch(action.type){
        case types.GET_SINGLE_EMPLOYEE:
            return action.payload.data;
        case types.GET_EMPLOYEES:
            return {employees:action.payload.data.content,
                pageInfo: action.payload.data};
    }
    return state;
}