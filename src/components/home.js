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
                name: "Joey Cardenas",
                phoneNumber: "8886756574",
                supervisor: "Jorge Manuela"
            },
            getEmployees: this.getEmployees(),
            employees: []
        }
    }
    // async componentWillMount(){
    //     console.log('we made it here');
    //     const response = await axios({
    //         method:'get',
    //         url:'http://localhost:8080/api/employees/home',
    //         responseType:'stream'
    //       });
    //     console.log('this is the employee data ', response.data);
    //     this.setState({
    //         employees:response.data
    //     })
    // }
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

    render(){
        const {name,phoneNumber,supervisor}= this.state.form;
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
                            <form action="">
                                <div className="form-group">
                                    <div className="row  align-items-end">
                                        <div className="col-4">
                                            <label htmlFor="name" >Search</label>
                                            <input placeholder= "Enter Employee Name or ID" className="form-control" type="text" name="name" value={name} onChange= {((e)=>this.handleInput(e))}/>
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
                            <tbody>{employeeList}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
