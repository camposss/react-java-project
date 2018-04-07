import React, { Component } from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import axios from "axios";

class App extends Component{

    componentDidMount(){
        axios({
            method:'get',
            url:'http://localhost:8080/reservations',
            responseType:'stream'
          })
            .then(function(response) {
                console.log(response)
          });
    }

    render(){
        return(
            <div>
                <div className="app">
                    <img src={logo} className="logo rotate"/>
                    <h1>Welcome to React</h1>
                </div>
            </div>
        );
    }

}

export default App;
