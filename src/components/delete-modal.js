import React, {Component} from 'react';
import '../assets/css/modal.css';
import {fetchEmployeeData, deleteEmployee, getAllEmployees} from '../actions';
import {connect} from 'react-redux';


class DeleteModal extends Component{
    constructor(props){
        super(props);
        this.state={
            employeeId: this.props.employeeId
        }
    }
     componentWillMount(){
        const currentPage= this.props.employees.pageInfo.pageable.pageNumber;
        this.props.fetchEmployeeData(currentPage);
        this.props.getAllEmployees();
    }
    renderSingleEmployee(){
        if(this.props.employees===undefined){
            return;
        }else{
            const singleEmployee= this.props.allEmployees.allEmployees.map((item, index)=>{
                if(item.id===this.props.employeeId){
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
        const deleteOne= await this.props.deleteEmployee(employeeId);
        const currentPage= this.props.employees.pageInfo.pageable.pageNumber;
        this.props.fetchEmployeeData(currentPage);
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
                                    <table className="table table-responsive-sm">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Number</th>
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
        employees: state.fetchEmployees,
        allEmployees: state.allEmployees
    }
}
export default connect(mapStateToProps, {fetchEmployeeData, deleteEmployee, getAllEmployees}) (DeleteModal);