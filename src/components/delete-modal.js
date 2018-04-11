import React, {Component} from 'react';
import '../assets/css/modal.css';
import {fetchEmployeeData, deleteEmployee} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class DeleteModal extends Component{
    constructor(props){
        super(props);
        this.state={
            employeeId: this.props.employeeId
        }
    }
     componentWillMount(){
        this.props.fetchEmployeeData();
    }
    renderSingleEmployee(){
        if(this.props.employees===undefined){
            return;
        }else{
            console.log('these are the props in render single empploye', this.props);
            const singleEmployee= this.props.employees.employees.map((item, index)=>{
                if(item.id===this.props.employeeId){
                    console.log('returning body');
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.supervisor}</td>
                            <td>
                                <a className="staticUpdateLink">Update</a> 
                                | <a className="staticDeleteLink">Delete</a> 
                            </td>
                        </tr>
                    )
                }
            })
            return singleEmployee;
        }
    }
    async deleteEmployee(employeeId){
        console.log('trying to delete employee with this Id', employeeId);
        const deleteOne= await this.props.deleteEmployee(employeeId);
        this.props.fetchEmployeeData();
        this.props.closeModal();
    }
    render(){
        const {employeeId}= this.props;
        return(
            <span>
              <div className="confirm-modal">
                    <div className="container content-modal">
                        <div className="card">
                            <div className="card-header text-center">
                                <h4>Please confirm the following action</h4>
                            </div>
                                <div>
                                    <div className='card-block'>
                                    <h5 className="text-center confirmDeleteHeader">Are you sure want to delete the following entry?</h5>
                                    <table className="table pull-left">
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Phone Number</th>
                                            <th>Supervisor</th>
                                            <th>Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderSingleEmployee()}</tbody>
                                </table>
                                    </div> 
                                </div>
                            <div className="card-footer row">
                                <div className="col-6 text-center">
                                    <button onClick= {this.props.closeModal} className='btn btn-outline-danger'>Cancel</button>
                                </div>  
                                <div className="col-6 text-center">
                                    <button onClick= {()=>this.deleteEmployee(employeeId)} className='btn btn-outline-success'>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </span>
        )
    }
}
function mapStateToProps(state){
    return{
        employees: state.fetchEmployees
    }
}
export default connect(mapStateToProps, {fetchEmployeeData, deleteEmployee}) (DeleteModal);