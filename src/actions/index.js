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

const fetch_employees_url = "http://localhost:8080/api/employees";
export function fetchEmployeeData() {
    const request = axios.get(fetch_employees_url);
    return {
        type: types.GET_EMLOYEES,
        payload: request
    };
}

const add_employee_url = "http://localhost:8080/api/employees";
export function addEmployee(values) {
    const request = axios.post(add_employee_url, {
        name: values.name,
        course: values.course,
        grade: values.grade

    });
    return {
        type: types.ADD_EMPLOYEE,
        payload: request
    };
}
const delete_employee_url = "http://localhost:8080/api/employees";
export function deleteEmployee(studentId) {
    const request = axios.post(delete_employee_url, {
        studentId: studentId

    });
    return {
        type: types.DELETE_EMPLOYEE,
        payload: request
    };
}
const update_employee_url = "http://localhost:8080/api/employees";
export function updateEmployee(form,studentId) {
    const request = axios.post(update_employee_url, {
        name: form.name,
        course: form.course,
        grade: form.grade,
        studentId: studentId

    });
    return {
        type: types.UPDATE_EMPOYEE,
        payload: request
    };
}