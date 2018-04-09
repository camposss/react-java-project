import React, {Component} from 'react';
import axios from 'axios';

class EditEmployee extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                name: '',
                phoneNumber:'',
                supervisor: ''
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    async componentDidMount(){
        console.log("these are the props in edit page", this.props);
        const employeeId= this.props.match.params.id;
        const updateUrl= 'http://localhost:8080/api/employees/'+ employeeId;
        const response = await axios({
            method:'get',
            url: updateUrl,
          });
        console.log('this is the employee data ', response.data);
        const {name, phoneNumber, supervisor}= response.data;
        this.setState({
            form:{
                name: name,
                phoneNumber: phoneNumber,
                supervisor: supervisor
            }
        })
    }
    handleInput(e){
        const {value, name}= e.target;
        const form= this.state;
        form[name]= value;
        this.setState({
            form: {...form}
        });
    }
    async handleSubmit(event){
        event.preventDefault();
        const {name,phoneNumber,supervisor}= this.state.form;

        const employeeId= this.props.match.params.id;
        const updateUrl= 'http://localhost:8080/api/employees/'+ employeeId;
        const response = await axios({
            method:'put',
            url: updateUrl,
            data:{
                name: name,
                phoneNumber:phoneNumber,
                supervisor:supervisor
            }
          });
        console.log('this is the employee data ', response.data);
        console.log('these are teh props', this.props);
        this.props.history.push('/home');
        // this.setState({
        //     employees:response.data
        // });
    }
    render(){
        const {name,phoneNumber,supervisor}= this.state.form;
        return(
            <div className="container">
                <div className="text-center">
                    <h2 className="page-header">Edit your employee</h2>
                </div>
                <div className="row">
                    <div className= "col-lg">
                        <form onSubmit={this.handleSubmit} >
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
                            <button className="btn btn-success">Save</button>
                        </form>
                    </div>
                </div>
            </div>
           
        );
    }
}
export default EditEmployee;