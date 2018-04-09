import React, {Component} from 'react';
import axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                username:'',
                password: ''
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillMount(){
        console.log('we will make axios call here');
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
        console.log('these are the values of the inputs ', this.state.form);
        this.reset()
        this.props.history.push('/home');
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
                                        <input placeholder= "Password" className="form-control" type="text" 
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
export default Login;