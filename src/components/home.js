import React, { Component } from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import axios from "axios";
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                name: "Joey Cardenas",
                phoneNumber: "8886756574",
                supervisor: "Jorge Manuela"
            },
            employees: []
        }
        this.addEmployee=this.addEmployee.bind(this);
    }
    async componentWillMount(){
        console.log('we made it here');
        const response = await axios({
            method:'get',
            url:'http://localhost:8080/api/employees/home',
            responseType:'stream'
          });
        console.log('this is the employee data ', response.data);
        this.setState({
            employees:response.data
        })
    }
    async getEmployees(){
        console.log('we made it here');
        const response = await axios({
            method:'get',
            url:'http://localhost:8080/api/employees/home',
            responseType:'stream'
          });
        console.log('this is the employee data ', response.data);
        return response.data;
        this.setState({
            employees:response.data
        })
    }
    async deleteEmployee(employeeId){
        // const employeeId= index;
        // alert('Are you sure you want to delete this?');
        console.log('this is the id of employee you clicked',employeeId );
        const updatedUrl= 'http://localhost:8080/api/employees/'+ employeeId;
        const response = await axios({
            method:'delete',
            url: updatedUrl,
            responseType:'stream'
          });
        console.log('this is the employee data after deleting ', response);
        // this.setState({
        //     employees:response.data
        // })
    }
    handleInput(e){
        const {value, name}= e.target;
        const form= this.state;
        form[name]= value;
        console.log(form);
        this.setState({
            form: {...form}
        });
    }
    async addEmployee(event){
        event.preventDefault();
        console.log(this.state.form);
        const {name,phoneNumber,supervisor}= this.state.form;
        const response= await axios({
            method:'post',
            url:'http://localhost:8080/api/employees/home',
            data:{
                "name": name,
                "phoneNumber": phoneNumber,
                "supervisor": supervisor
            }
          })
        console.log('Newly added employee', response);
        this.getEmployees();
        // this.setState({

        // })
    }
    render(){
        const {name,phoneNumber,supervisor}= this.state.form;
        console.log('these are the employees in rendered',this.state.employees);

        const employeeList= this.state.employees.map((item, index)=>{
            console.log('this is the item', item);
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
                    <div className= "col-lg">
                        <form onSubmit={this.addEmployee} >
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
                            <button className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg">
                        <h2 className="text-center">All Employees</h2>
                        <table className="table pull-left">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th> Phone Number</th>
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
