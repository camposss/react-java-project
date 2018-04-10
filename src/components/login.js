import React, {Component} from 'react';
import axios from 'axios';
import {fetchUserData} from "../actions";
import {connect} from "react-redux";

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                username:'',
                password: ''
            },
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    async componentWillMount(){
        const response = await this.props.fetchUserData();
        console.log('after doing axios call with redux ', this.props.users);
    }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;
        this.setState({
            form: {...form}
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const {username, password}= this.state.form;
        const users= this.props.users[0];
        // console.log(users['username']);
        if(username===users['username'] && password===users['password']){
            console.log('it worked!');
            this.props.history.push('/home');

        }else{
            console.log('it didnt work');
            this.reset();
        }        
    }
    reset(){
        this.setState({
            form:{
                username:'',
                password:''
            }
        })
    }
    render(){
        const {username, password}= this.state.form;
        return(
            <div className="container">
                <div className="jumbotron login-jumbo">
                    <div className="text-center">
                        <h1>Welcome to Java Bank!</h1> 
                        <p>To get started, please enter your credentials</p> 
                    </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="username text-left" >Username</label>
                                        <input placeholder= "Username" className="form-control" type="text" 
                                        name="username" value={username} 
                                        onChange= {((e)=>this.handleInput(e))}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label htmlFor="password" >Password</label>
                                        <input placeholder= "Password" className="form-control" type="password" 
                                        name="password" value={password} 
                                        onChange= {((e)=>this.handleInput(e))}/>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-success">Login</button>
                                </div>
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
export default connect(mapStateToProps, {fetchUserData}) (Login);