import React, {Component} from "react";
import axios from "axios";
import * as regex from '../helpers/regex';
import {fetchEmployeeData, addEmployee} from '../actions';
import {connect} from 'react-redux';

class AddForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            form:{
                name: "Joey Cardenas",
                phoneNumber: "8886756574",
                supervisor: "Jorge Manuela"
            }
        }
        this.addEmployee=this.addEmployee.bind(this);
    }
    componentWillMount(){
        console.log('these are the props in add form:', this.props);
    }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;
        this.setState({
            form: {...form}
        });
    }
    async addEmployee(event){
        event.preventDefault();
        const {form}= this.state;
        // const validateName= regex.validateName(name);
        // console.log(validateName);
        const addEmployee= await this.props.addEmployee(form);
        this.props.fetchEmployeeData();
    }
    render(){
        const {name, phoneNumber, supervisor}= this.state.form;
        return(
            <div className= "col-lg">
                <h2 className="text-center">Add New Employee?</h2>
                <form onSubmit={this.addEmployee} >
                    <div className="form-group">
                        <label htmlFor="name" >Employee Name</label>
                        <input className="form-control" type="text" name="name" value={name} onChange= {((e)=>this.handleInput(e))}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" >Phone Number</label>
                        <input className="form-control" type="text" name="phoneNumber" value={phoneNumber}  onChange= {((e)=>this.handleInput(e))}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="supervisor" >Supervisor</label>
                        <input className="form-control" type="text" name="supervisor" value={supervisor} onChange= {((e)=>this.handleInput(e))}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}
export default connect(null, {fetchEmployeeData, addEmployee}) (AddForm);