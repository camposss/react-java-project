import React, {Component} from "react";
import axios from "axios";
import * as regex from '../helpers/regex';
import {fetchEmployeeData, addEmployee} from '../actions';
import {connect} from 'react-redux';
import { Field, reduxForm } from "redux-form";

class AddForm extends Component{
    constructor(props){
        super(props);
        this.addEmployee=this.addEmployee.bind(this);
    }
    renderInput({ placeholder, label, input, type, meta: { touched, error, active, visited } }) {
        return (
            <span>
                {/*<label>{label}</label>*/}
                <input placeholder= {placeholder} className="form-control" type={type} {...input} />
                <p className="inputErrorMessage text-danger text-center">{ input.name==='' ? touched && visited && error : touched && !active && error }</p>
            </span>
        );
    }
    async addEmployee(values){
        const addEmployee= await this.props.addEmployee(values);
        this.props.fetchEmployeeData();
        this.props.destroy();
    }
    render(){
        return(
            <div className= "col-lg">
                <h2 className="text-center">Manage Employees</h2>
                <form onSubmit={this.props.handleSubmit(this.addEmployee.bind(this))} >
                    <div className="form-group">
                        <label htmlFor="name" >Employee Name</label>
                        <Field placeholder="Enter employee's name" name='name' label='Employee Name' type='text' component={this.renderInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" >Phone Number</label>
                        <Field placeholder="Enter employee's phone number" name='phoneNumber' label='Phone Number' type='number' component={this.renderInput}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="supervisor" >Supervisor</label>
                        <Field placeholder="Enter employee's supervisor" name='supervisor' label='Supervisor' type='text' component={this.renderInput}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        )
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
        error.phoneNumber= "Please enter an appropriate 10 digit number"
    }
    if(!values.supervisor){
        error.supervisor = "Please enter employee's supervisor";
    }
    if(error.invalidSupervisor){
        error.supervisor= "Please enter a valid name";
    }
    return error;
}

AddForm = reduxForm({
    form: "add-form",
    validate: validate
})(AddForm);

export default connect(null, {fetchEmployeeData, addEmployee}) (AddForm);