import React, { Component } from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import axios from "axios";
import {Link} from 'react-router-dom';
import AddForm from './add-employee-form';
import {fetchEmployeeData,deleteEmployee,getAllEmployees} from '../actions';
import {connect} from 'react-redux';
import DeleteModal from './delete-modal';
import '../assets/css/modal.css';
import leftArrow from '../assets/images/arrow-left-4x.png';
import rightArrow from '../assets/images/arrow-right-4x.png';


class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                input: ''
            },
            showModal: false,
            resultsFound:true
        }
        this.handleSearchInput=this.handleSearchInput.bind(this);
    }
    async componentWillMount(){
       const response= this.props.fetchEmployeeData();
       const allEmployees= this.props.getAllEmployees();
       console.log('these are now the props ', this.props);

    }
    handleInput(e){
        const {value, name}= e.target;
        const {form}= this.state;
        form[name]= value;
        this.setState({
            form: {...form},
            resultsFound:true
        });
    }
    handleSearchInput(e){
        e.preventDefault();
        console.log('this is the current value of input ', this.state.form);

        this.setState({
            resultsFound:false
        })
        // this.resetSearchInput();
    }
    filterList(){
        const {input}= this.state.form;
        let filteredArray=[];
        const list= this.props.allEmployees.allEmployees.map((item, index)=>{
            for(let employeeProperty in item){
                if(employeeProperty==='name'){
                    const lowerCaseName= item[employeeProperty].toLowerCase();
                    const name= item[employeeProperty];
                    // console.log(item[employeeProperty].toLowerCase());
                    if(lowerCaseName.includes(input.toLowerCase()) || name.includes(input) && typeof(item[employeeProperty]!=='number') ){
                        filteredArray.push(item);
                    }
                }
                else if(employeeProperty==='id'){
                    if(item[employeeProperty]===parseInt(input)){
                        filteredArray.push(item);
                    }
                }
            }
        })
        if(!filteredArray.length){
            console.log('we are returning nothing');
            // return(
            //     <h2>No Results. Please Try Again.</h2>
            // );
        }else{
            console.log('this is the filtered array right before mapping ', filteredArray);
            const filteredList= filteredArray.map((item, index)=>{
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.supervisor}</td>
                        <td>
                            <Link to ={"/edit-employee/"+ item['id']}> Update </Link>|<a className="deleteLink" onClick={()=>this.showDeleteModal(item['id'])}>Delete</a> 
                        </td>
                    </tr>
                )
            }); 
            return filteredList;      
        }
    }
    renderEmployees(){
        console.log("these are the props", this.props);
        if(this.props.employees.employees.length===0){
            return;
        }else{
            const employeeList= this.props.employees.employees.map((item, index)=>{
                // if(index>=10){
                //     return;
                // }
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.supervisor}</td>
                        <td>
                            <Link to ={"/edit-employee/"+ item['id']}>Update</Link> 
                            | <a className="deleteLink" onClick={()=>this.showDeleteModal(item['id'])} >Delete</a> 
                        </td>
                    </tr>
                )
            })
            return employeeList;
        }
    }
    showDeleteModal(employeeId){
        console.log('we got the id', employeeId);
        this.setState({
            showModal:true,
            employeeId:employeeId
        })
    }
    closeModal(){
        this.setState({
            showModal:false,
            employeeId:''
        })
    }
    prevPage(){
        const pageNumber= this.props.employees.pageInfo.pageable.pageNumber;
        const prevPage= pageNumber-1;
        if(prevPage >= 0){
            this.props.fetchEmployeeData(prevPage);
        }
    }
    nextPage(){
        const pageNumber= this.props.employees.pageInfo.pageable.pageNumber;
        const maxPage= this.props.employees.pageInfo.totalPages;
        const nextPage= pageNumber+1;
        if(pageNumber!==maxPage-1){
            this.props.fetchEmployeeData(nextPage);
        }
    }
    renderArrow(direction){
        if(!this.props.employees.employees.length){
            return;
        }else{
            const pageNumber= this.props.employees.pageInfo.pageable.pageNumber; 
            const maxPage= this.props.employees.pageInfo.totalPages-1;
            if(direction==='right'){
                return(
                    <div onClick= {()=>this.nextPage()}
                        className={pageNumber!==maxPage? "col-3 right-arrow text-center": "col-3 text-center hide-arrow"}>
                        Next Page <img src={rightArrow}/>
                    </div>
                )
            }else if(direction==='left'){
                return(
                    <div onClick= {()=>this.prevPage()} 
                        className={pageNumber >0? "col-3 left-arrow": "col-3 hide-arrow"}>
                        <img src={leftArrow}/> Previous Page
                    </div>
                )
            }
        }
    }
    render(){
        const {input}= this.state.form;
        const {showModal, employeeId, resultsFound} =this.state;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <div className="jumbotron text-center">
                            <h1>Welcome to Java Bank!</h1> 
                            <p>You can bank on use to store your data! :)</p> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <AddForm/>
                    
                </div>

                {!showModal? '': <DeleteModal closeModal={()=>this.closeModal()} employeeId= {employeeId}/>}
                <div className="row table-container">
                    <div className="col-lg">
                            <form onSubmit={this.handleSearchInput}>
                                <div className="form-group">
                                    <div className="row align-items-end">
                                        {this.renderArrow("left")}
                                        <div className="col-5 offset-1 justify-content-center">
                                            <div className="row align-items-end justify-content-end">
                                                <div className="col-9">
                                                    <label htmlFor="name">Search Filter</label>
                                                    <input placeholder= "Enter Employee Name or ID" className="form-control" type="text" 
                                                    name="input" value={input} 
                                                    onChange= {((e)=>this.handleInput(e))}/>
                                                </div>
                                                <div className="col-3">
                                                    <button className="btn btn-primary">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                        {this.renderArrow("right")}
                                    </div>
                                </div>
                            </form>
                        <div className="inside-table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Employee Name</th>
                                    <th>Phone Number</th>
                                    <th>Supervisor</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {input===''? this.renderEmployees(): this.filterList()}
                            </tbody>
                        </table>
                        </div>
                        {resultsFound? '': <h2 className="text-center noResultsHeader">No Results Found. Please Try Again.</h2>  }
                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        employees: state.fetchEmployees,
        pageInfo: state.fetchEmployees,
        allEmployees: state.allEmployees
    }
}
export default connect(mapStateToProps, {fetchEmployeeData, deleteEmployee, getAllEmployees}) (Home);
