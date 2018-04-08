import React, { Component } from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import axios from "axios";

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                name: "Joey Cardenas",
                phoneNumber: "8886756574",
                supervisor: "Jorge Manuela"
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        axios({
            method:'get',
            url:'http://localhost:8080/api/employees',
            responseType:'stream'
          })
            .then(function(response) {
                console.log(response)
          });
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
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.form);
        const {name,phoneNumber,supervisor}= this.state.form;
        axios({
            method:'post',
            url:'http://localhost:8080/api/employees',
            data:{
                "name": name,
                "phoneNumber": phoneNumber,
                "supervisor": supervisor
            }
          })
            .then(function(response) {
                console.log(response)
          });
    }
    render(){
        const {name,phoneNumber,supervisor}= this.state.form;
        return(
            <div>
                <div className="app">
                    <img src={logo} className="logo rotate"/>
                    <h1>Welcome to React</h1>
                    <form onSubmit={this.handleSubmit} >
                        <input type="text" name="name" value={name} onChange= {((e)=>this.handleInput(e))}/>
                        <input type="text" name="phoneNumber" value={phoneNumber} onChange= {((e)=>this.handleInput(e))}/>
                        <input type="text" name="supervisor" value={supervisor} onChange= {((e)=>this.handleInput(e))}/>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default App;
