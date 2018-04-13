import React, {Component} from 'react';
import axios from 'axios';
import * as regex from '../helpers/regex';
import {fetchSingleEmployee, updateEmployee, fetchEmployeeData} from '../actions';
import {connect} from 'react-redux';
import { Field, reduxForm } from "redux-form";

class EditEmployee extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const employeeId= this.props.match.params.id;
        this.props.fetchSingleEmployee(employeeId);
    }
    renderInput({ placeholder, label, input, type, value, meta: { touched, error, active, visited } }) {
        return (
            <span>
                <input placeholder= {placeholder} className="form-control" type={type} {...input} />
                <p className="inputErrorMessage text-danger text-center">{ input.name==='' ? touched && visited && error : touched && !active && error }</p>
            </span>
        );
    }
    async updateEmployee(values){
        const employeeId= this.props.match.params.id;
        let onlyNumber = values.phoneNumber.replace(/\D/g, '');
        onlyNumber = onlyNumber.replace(/^(\d{3})(\d{3})(\d{4})+$/, "($1) $2-$3");
        values.phoneNumber= onlyNumber;
        const updateEmployee =await this.props.updateEmployee(values, employeeId)
        const updateList= await this.props.fetchEmployeeData();
        this.props.history.push('/home');
    }
    render(){
        return(
            <div className="container login-container">
            <div className="jumbotron edit-page-jumbo">
                <div className="text-center">
                    <h2 className="page-header">Edit your employee</h2>
                </div>
                <div className="row">
                    <div className= "col-lg">
                        <form onSubmit={this.props.handleSubmit(this.updateEmployee.bind(this))} >
                            <div className="form-group">
                                <label htmlFor="name" >Employee Name</label>
                                <Field placeholder="Enter employee's name" name='name' label='Employee Name' type='text' component={this.renderInput}/>
                                </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" >Phone Number</label>
                                <Field placeholder="(###) ###-####" name='phoneNumber' label='Phone Number' type='tel' component={this.renderInput}/>
                                </div>
                            <div className="form-group">
                                <label htmlFor="supervisor" >Supervisor</label>
                                <Field placeholder="Enter employee's supervisor" name='supervisor' label='Supervisor' type='text' component={this.renderInput}/>
                                </div>
                            <button className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
           
        );
    }
}
function mapStateToProps(state){
    return{
        employee: state.fetchSingleEmployee
    }
}

function validate(values) {
    const error = {};
    error.invalidName =regex.validateName(values.name);
    error.invalidSupervisor= regex.validateName(values.supervisor);
    error.invalidPhone =regex.validateNumber(values.phoneNumber);

    if(!values.name){
        error.name= "Please enter an employee's name";
    }
    if(error.invalidName){
        error.name= "Please enter a valid name";
    }
    if(!values.phoneNumber){
        error.phoneNumber = "Please enter employee's phone number";
    }
    if(error.invalidPhone){
        error.phoneNumber= "Please enter a valid 10 digit number"
    }
    if(!values.supervisor){
        error.supervisor = "Please enter employee's supervisor's name";
    }
    if(error.invalidSupervisor){
        error.supervisor= "Please enter a valid name";
    }
    return error;
}

function mapStateToProps(state){
    return {
        employee: state.fetchSingleEmployee,
        initialValues: state.fetchSingleEmployee
    }
}
EditEmployee = reduxForm({
    form: "add-form",
    validate: validate,
    enableReinitialize: true
})(EditEmployee);

export default connect(mapStateToProps, {fetchEmployeeData, fetchSingleEmployee, updateEmployee}) (EditEmployee);
