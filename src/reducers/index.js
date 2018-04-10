import {combineReducers} from 'redux';
import FetchEmployeeReducer from './fetch_employee_reducer';
import AddEmployeeReducer from './add_employee_reducer';
import DeleteEmployeeReducer from './delete_employee_reducer';
import UpdateEmployeeReducer from './update_employee_reducer';
import FetchUserReducer from './fetch_user_reducer';
import { reducer as formReducer } from 'redux-form';


const rootReducer =combineReducers({
    fetchEmployee: FetchEmployeeReducer,
    addStudent: AddEmployeeReducer,
    deleteStudent: DeleteEmployeeReducer,
    updateStudent: UpdateEmployeeReducer,
    fetchUser: FetchUserReducer,
    form: formReducer
});

export default rootReducer;