import React, { Component } from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import axios from "axios";
import {Link} from 'react-router-dom';
import AddForm from './add-employee-form';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                input: ''
            },
            getEmployees: this.getEmployees(),
            employees: []
        }
        this.handleSearchInput=this.handleSearchInput.bind(this);
    }
    async getEmployees(){
        const response = await axios({
            method:'get',
            url:'http://localhost:8080/api/employees/',
          });
        this.setState({
            employees:response.data
        })
    }

    async deleteEmployee(employeeId){
        // const employeeId= index;
        // alert('Are you sure you want to delete this?');
        const updatedUrl= 'http://localhost:8080/api/employees/'+ employeeId;
        const response = await axios({
            method:'delete',
            url: updatedUrl,
          });
        this.getEmployees();
    }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;
        console.log(form);

        this.setState({
            form: {...form}
        });
    }
    handleSearchInput(e){
        e.preventDefault();
        console.log('this is the current value of input ', this.state.form);
    }
    filterList(){
        const {input}= this.state.form;
        let filteredArray=[];
        const list= this.state.employees.map((item, index)=>{
            for(let employeeProperty in item){
                if(employeeProperty==='name'){
                    if(item[employeeProperty].includes(input) && typeof(item[employeeProperty]!=='integer') ){
                        console.log('we found something that contains this value',item[employeeProperty]);
                        filteredArray.push(item);
                        console.log('this is the array with object we want to return ', filteredArray);
                    }
                }
                else if(employeeProperty==='id'){
                    console.log('this is the value of the property', item[employeeProperty]);
                    if(item[employeeProperty]===parseInt(input)){
                        console.log('we found something that contains this value',item[employeeProperty]);
                        filteredArray.push(item);
                        console.log('this is the array with object we want to return ', filteredArray);
                    }
                }
            }
        })
        if(!filteredArray){
            console.log('we are returning nothing');
        }else{
            const filteredList= filteredArray.map((item, index)=>{
                console.log('this is the item in filtered LIst', item);
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.supervisor}</td>
                        <td>
                            <Link to ={"/edit-employee/"+ item['id']}>Update</Link> 
                            | <a className="deleteLink" onClick={()=>this.deleteEmployee(item['id'])}>Delete</a> 
                        </td>
                    </tr>
                )
            }); 
            return filteredList;      
        }
    }
    render(){
        const {input}= this.state.form;
        const employeeList= this.state.employees.map((item, index)=>{
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.supervisor}</td>
                    <td>
                        <Link to ={"/edit-employee/"+ item['id']}>Update</Link> 
                        | <a className="deleteLink" onClick={()=>this.deleteEmployee(item['id'])}>Delete</a> 
                    </td>
                </tr>
            )
        })
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
                    <AddForm employee= {()=>this.getEmployees()}/>
                </div>
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
                            <tbody>{input===''? employeeList: this.filterList()}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
