import React, {Component} from 'react';
import axios from 'axios';
import * as regex from '../helpers/regex';
import {fetchSingleEmployee, updateEmployee, fetchEmployeeData} from '../actions';
import {connect} from 'react-redux';
import { Field, reduxForm } from "redux-form";

class EditEmployee extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    async componentWillMount(){
        const employeeId= this.props.match.params.id;
        const response = await this.props.fetchSingleEmployee(employeeId);
        const {name, phoneNumber, supervisor}= this.props.employee;
    }
    async handleSubmit(event){
        event.preventDefault();
        const {form}= this.state;
        const employeeId= this.props.match.params.id;
        const updateEmployee =await this.props.updateEmployee(form, employeeId)
        const updateList= await this.props.fetchEmployeeData();
        this.props.history.push('/home');
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
        const updateEmployee =await this.props.updateEmployee(values, employeeId)
        const updateList= await this.props.fetchEmployeeData();
        this.props.history.push('/home');
    }
    render(){
        return(
            <div className="container">
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
                                <Field placeholder="Enter employee's phone number" name='phoneNumber' label='Phone Number' type='number' component={this.renderInput}/>
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
        error.invalidName= "Please enter a valid name";
    }
    if(!values.phoneNumber){
        error.phoneNumber = "Please enter employee's phone number";
    }
    if(error.invalidPhone){
        error.invalidPhone= "Please enter an appropriate 10 digit number"
    }
    if(!values.supervisor){
        error.supervisor = "Please enter employee's supervisor";
    }
    if(error.invalidSupervisor){
        error.invalidSupervisor= "Please enter a valid name";
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
