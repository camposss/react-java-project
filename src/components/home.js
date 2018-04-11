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
            showModal: false,
            resultsFound:true
        }
        this.handleSearchInput=this.handleSearchInput.bind(this);
    }
    componentWillMount(){
        this.props.fetchEmployeeData();
    }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;
        this.setState({
            form: {...form},
            resultsFound:true
        });
    }
    handleSearchInput(e){
        e.preventDefault();
        console.log('this is the current value of input ', this.state.form);
        this.setState({
            resultsFound:false
        })
        // this.resetSearchInput();
    }
    filterList(){
        const {input}= this.state.form;
        let filteredArray=[];
        const list= this.props.employees.map((item, index)=>{
            for(let employeeProperty in item){
                if(employeeProperty==='name'){
                    const lowerCaseName= item[employeeProperty].toLowerCase();
                    const name= item[employeeProperty];
                    console.log(item[employeeProperty].toLowerCase());
                    if(lowerCaseName.includes(input) || name.includes(input) && typeof(item[employeeProperty]!=='number') ){
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
        if(!filteredArray.length){
            console.log('we are returning nothing');
            // return(
            //     <h2>No Results. Please Try Again.</h2>
            // );
        }else{
            const filteredList= filteredArray.map((item, index)=>{
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.supervisor}</td>
                        <td>
                            <Link to ={"/edit-employee/"+ item['id']}> Update </Link>|<a className="deleteLink" onClick={()=>this.showDeleteModal(item['id'])}>Delete</a> 
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
            console.log(this.props.employees.sort());
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
        const {showModal, employeeId, resultsFound} =this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <div className="jumbotron text-center">
                            <h1>Welcome to Java Bank!</h1> 
                            <p>You can bank on use to store your data! :)</p> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <AddForm/>
                </div>
                {!showModal? '': <DeleteModal closeModal={()=>this.closeModal()} employeeId= {employeeId}/>}
                <div className="row table-container">
                    <div className="col-lg">
                            <form onSubmit={this.handleSearchInput}>
                                <div className="form-group">
                                    <div className="row align-items-end">
                                        <div className="col-4">
                                            <label htmlFor="name">Search Filter</label>
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
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Phone Number</th>
                                    <th>Supervisor</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {input===''? this.renderEmployees(): this.filterList()}
                            </tbody>
                        </table>
                        {resultsFound? '': <h2 className="text-center noResultsHeader">No Results Found. Please Try Again.</h2>  }
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
