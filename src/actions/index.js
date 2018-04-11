import axios from "axios";
import types from "./types.js";


const fetch_users_url = "http://localhost:8080/api/users";
export function fetchUserData() {
    const request = axios.get(fetch_users_url);
    return {
        type: types.GET_USERS,
        payload: request
    };
}
const fetch_all_employees = "http://localhost:8080/api/employees/";
export function getAllEmployees() {
    const request = axios.get(fetch_all_employees);
    return {
        type: types.GET_ALL_EMPLOYEES,
        payload: request
    };
}

const fetch_employees_url = "http://localhost:8080/api/employees/page/";
export function fetchEmployeeData(page=0) {
    const request = axios.get(fetch_employees_url+page);
    return {
        type: types.GET_EMPLOYEES,
        payload: request
    };
}
const fetch_single_employee_url = "http://localhost:8080/api/employees/";
export function fetchSingleEmployee(employeeId) {
    const request = axios.get(fetch_single_employee_url+employeeId);
    return {
        type: types.GET_SINGLE_EMPLOYEE,
        payload: request
    };
}

const add_employee_url = "http://localhost:8080/api/employees";
export function addEmployee(values) {
    const request = axios.post(add_employee_url, {
        "name": values.name,
        "phoneNumber": values.phoneNumber,
        "supervisor": values.supervisor

    });
    return {
        type: types.ADD_EMPLOYEES,
        payload: request
    };
}
const delete_employee_url = "http://localhost:8080/api/employees/";
export function deleteEmployee(employeeId) {
    const request = axios.delete(delete_employee_url+employeeId);
    return {
        type: types.DELETE_EMPLOYEE,
        payload: request
    };
}
const update_employee_url = "http://localhost:8080/api/employees/";
export function updateEmployee(form,employeeId) {
    const request = axios.put(update_employee_url+employeeId, {
        name: form.name,
        phoneNumber: form.phoneNumber,
        supervisor: form.supervisor,
    });
    return {
        type: types.UPDATE_EMPOYEE,
        payload: request
    };
}