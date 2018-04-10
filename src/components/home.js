import React, { Component } from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import axios from "axios";
import {Link} from 'react-router-dom';
import AddForm from './add-employee-form';
import {fetchEmployeeData,deleteEmployee} from '../actions';
import {connect} from 'react-redux';
import DeleteModal from './delete-modal';
import '../assets/css/modal.css';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                input: ''
            },
            showModal: false
        }
        this.handleSearchInput=this.handleSearchInput.bind(this);
    }
    componentWillMount(){
        this.props.fetchEmployeeData();
    }
    // async deleteEmployee(employeeId){
    //     console.log('trying to delete employee with this Id', employeeId);
    //     const deleteOne= await this.props.deleteEmployee(employeeId);
    //     this.props.fetchEmployeeData();
    //     this.setState({
    //         showModal:false
    //     })
    // }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;
        this.setState({
            form: {...form}
        });
    }
    handleSearchInput(e){
        e.preventDefault();
        console.log('this is the current value of input ', this.state.form);
        // this.resetSearchInput();
    }
    // resetSearchInput(){
    //     this.setState({
    //         form:{
    //             input: ''
    //         },
    //     })
    // }
    filterList(){
        const {input}= this.state.form;
        let filteredArray=[];
        const list= this.props.employees.map((item, index)=>{
            for(let employeeProperty in item){
                if(employeeProperty==='name'){
                    if(item[employeeProperty].includes(input) && typeof(item[employeeProperty]!=='integer') ){
                        filteredArray.push(item);
                    }
                }
                else if(employeeProperty==='id'){
                    if(item[employeeProperty]===parseInt(input)){
                        filteredArray.push(item);
                    }
                }
            }
        })
        if(!filteredArray){
            console.log('we are returning nothing');
            return;
        }else{
            const filteredList= filteredArray.map((item, index)=>{
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.supervisor}</td>
                        <td>
                            <Link to ={"/edit-employee/"+ item['id']}>Update</Link> 
                            | <a className="deleteLink" onClick={()=>this.showDeleteModal(item['id'])} >Delete</a> 
                        </td>
                    </tr>
                )
            }); 
            return filteredList;      
        }
    }
    renderEmployees(){
        if(!this.props.employees.length){
            return;
        }else{
            const employeeList= this.props.employees.map((item, index)=>{
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.supervisor}</td>
                        <td>
                            <Link to ={"/edit-employee/"+ item['id']}>Update</Link> 
                            | <a className="deleteLink" onClick={()=>this.showDeleteModal(item['id'])} >Delete</a> 
                        </td>
                    </tr>
                )
            })
            return employeeList;
        }
    }
    showDeleteModal(employeeId){
        console.log('we got the id', employeeId);
        this.setState({
            showModal:true,
            employeeId:employeeId
        })
    }
    closeModal(){
        this.setState({
            showModal:false,
            employeeId:''
        })
    }
    render(){
        const {input}= this.state.form;
        const {showModal,employeeId} =this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <div className="jumbotron text-center">
                            <h1>Welcome to Java Bank!</h1> 
                            <p>We hope you like our CRM interface :)</p> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <AddForm/>
                </div>
                {!showModal? '': <DeleteModal closeModal={()=>this.closeModal()} employeeId= {employeeId}/>}
                <div className="row">
                    <div className="col-lg">
                        <h2 className="text-center">All Employees</h2>
                            <form onSubmit={this.handleSearchInput}>
                                <div className="form-group">
                                    <div className="row  align-items-end">
                                        <div className="col-4">
                                            <label htmlFor="name" >Search</label>
                                            <input placeholder= "Enter Employee Name or ID" className="form-control" type="text" 
                                            name="input" value={input} 
                                            onChange= {((e)=>this.handleInput(e))}/>
                                        </div>
                                        <div className="col-2">
                                            <button className="btn btn-primary">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        <table className="table pull-left">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Phone Number</th>
                                    <th>Supervisor</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>{input===''? this.renderEmployees(): this.filterList()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        employees: state.fetchEmployees
    }
}
export default connect(mapStateToProps, {fetchEmployeeData, deleteEmployee}) (Home);
