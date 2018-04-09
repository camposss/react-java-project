import React, {Component} from 'react';
import axios from 'axios';


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                username:'',
                password: ''
            },
            getUsers: this.getUsers(),
            users: []
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    async getUsers(){
        const response = await axios({
            method:'get',
            url:'http://localhost:8080/api/users',
          });
          console.log('this is the response from api', response);
        this.setState({
            users:response.data[0]
        })
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
        const users= this.state.users;
        console.log('these are the values of the inputs ', this.state);
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
export default Login;