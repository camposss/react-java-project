import React, {Component} from 'react';
import axios from 'axios';
import {fetchSingleEmployee, updateEmployee, fetchEmployeeData} from '../actions';
import {connect} from 'react-redux';

class EditEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                name: '',
                phoneNumber: '',
                supervisor: ''
            }   
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    async componentWillMount(){
        const employeeId= this.props.match.params.id;
        const response = await this.props.fetchSingleEmployee(employeeId);
        const {name, phoneNumber, supervisor}= this.props.employee;
        this.setState({
            form:{
                name: name,
                phoneNumber: phoneNumber,
                supervisor: supervisor
            }
        })
    }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;        
        this.setState({
            form:{...form}
        });
    }
    async handleSubmit(event){
        event.preventDefault();
        const {form}= this.state;
        const employeeId= this.props.match.params.id;
        const updateEmployee =await this.props.updateEmployee(form, employeeId)
        const updateList= await this.props.fetchEmployeeData();
        this.props.history.push('/home');
    }
    render(){
        const {name,phoneNumber,supervisor}= this.state.form;
        return(
            <div className="container">
                <div className="text-center">
                    <h2 className="page-header">Edit your employee</h2>
                </div>
                <div className="row">
                    <div className= "col-lg">
                        <form onSubmit={this.handleSubmit} >
                            <div className="form-group">
                                <label htmlFor="name" >Employee Name</label>
                                <input className="form-control" type="text" name="name" value={name} onChange= {((e)=>this.handleInput(e))}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber" >Phone Number</label>
                                <input className="form-control" type="text" name="phoneNumber" value={phoneNumber} onChange= {((e)=>this.handleInput(e))}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="supervisor" >Supervisor</label>
                                <input className="form-control" type="text" name="supervisor" value={supervisor} onChange= {((e)=>this.handleInput(e))}/>
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
export default connect(mapStateToProps, {fetchEmployeeData, fetchSingleEmployee, updateEmployee}) (EditEmployee);
