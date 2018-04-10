import types from '../actions/types';

// const DEFAULT_STATE= {
//     users: []
// };

export default function(state=[], action){
    switch(action.type){
        case types.GET_USERS:
            return action.payload.data;
    }
    return state;
}