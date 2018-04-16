import React, {Component} from 'react';
import axios from 'axios';
import {fetchUserData} from "../actions";
import {connect} from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as regex from '../helpers/regex';


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            incorrectCredentials: ''
        }
    }
    async componentWillMount(){
        const response = await this.props.fetchUserData();
    }
    renderInput({ placeholder, input, type, meta: { touched, error, active, visited } }) {
        return (
            <span>
                <input placeholder= {placeholder} className="form-control" type={type} {...input} />
                <p className="inputErrorMessage text-danger text-center">{ input.name==='' ? touched && visited && error : touched && !active && error }</p>
            </span>

        );
    }
    login(values){
        const {username, password}= values;
        const users= this.props.users[0];
        if(username===users['username'] && password===users['password']){
            this.props.history.push('/home');

        }else{
            const errorMessage= "You have entered an incorrect username or password. Please try again."
            this.props.destroy();
            this.setState({
                incorrectCredentials: errorMessage
            })
        }        
    }
    render(){
        const {incorrectCredentials}= this.state;
        return(
            <div className="container login-container">
                <div className="jumbotron login-jumbo">
                    <div className="text-center">
                        <h1>Welcome to Java Bank!</h1> 
                        <p>To get started, please enter your credentials</p> 
                    </div>
                        <form onSubmit={this.props.handleSubmit(this.login.bind(this))}>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-12 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="username text-left" >Username</label>
                                        <Field placeholder="Enter your username" name='username' label='Username' type='text' component={this.renderInput}/>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="password" >Password</label>
                                        <Field placeholder="Enter your password" name='password' label='Password' type='password' component={this.renderInput}/>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-2">
                                    <button className="btn btn-success">Login</button>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <p className="text-danger">{!incorrectCredentials? '': incorrectCredentials}</p>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        users: state.fetchUser
    }
}
function validate(values) {
    const error = {};
    error.invalidUsername =regex.validateName(values.name);
    error.invalidSupervisor= regex.validateName(values.supervisor);

    if(!values.username){
        error.username= "Please enter your username";
    }
    if(error.invalidName){
        error.username= "Please enter a valid username";
    }
    if(!values.password){
        error.password = "Please enter your password";
    }
    if(error.invalidPassword){
        error.password= "Please enter a valid password";
    }
    return error;
}

Login = reduxForm({
    form: "add-form",
    validate: validate
})(Login);

export default connect(mapStateToProps, {fetchUserData}) (Login);