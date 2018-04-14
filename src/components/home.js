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
            resultsFound:true,
            loaded: false
        }
        this.handleSearchInput=this.handleSearchInput.bind(this);
    }
    async componentWillMount(){
       const response= await this.props.fetchEmployeeData();
       const allEmployees= await this.props.getAllEmployees();
       if(response.payload.status===200){
            this.setState({
                loaded: true
            })
       }      
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
        const {resultsFound}= this.state;
        e.preventDefault();
        this.setState({
            resultsFound:false
        })
    }
    filterList(){
        const {input}= this.state.form;
        let filteredArray=[];
        const list= this.props.allEmployees.allEmployees.map((item, index)=>{
            for(let employeeProperty in item){
                if(employeeProperty==='name'){
                    const lowerCaseName= item[employeeProperty].toLowerCase();
                    const name= item[employeeProperty];
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
            return(
                <tr>
                    <td className="pesky-td text-center" colSpan="5">
                        <h2 className="text-danger">No Results Found. Please Try Again</h2>
                    </td>
                </tr>
            );            
        }else{
            const filteredList= filteredArray.map((item, index)=>{
                return (
                    <tr key={index} data="true">
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
        if(this.props.employees.employees.length===0){
            return;
        }else{
            const employeeList= this.props.employees.employees.map((item, index)=>{
                return (
                    <tr key={index} data="true">
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
        this.setState({
            showModal:true,
            employeeId:employeeId
        })
    }
    closeModal(){
        this.props.getAllEmployees();
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
                        className={pageNumber!==maxPage? "text-right col-md-3 col-6 right-arrow text-lg-center": "text-right col-md-3 text-lg-center hide-arrow"}>
                        Next Page <img src={rightArrow}/>
                    </div>
                )
            }else if(direction==='left'){
                return(
                    <div onClick= {()=>this.prevPage()} 
                        className={pageNumber >0? "previousButtonDesktop col-md-3 left-arrow": "previousButtonDesktop col-md-3 hide-arrow"}>
                        <img src={leftArrow}/> Previous Page
                    </div>
                )
            }
        }
    }
    render(){
        const {showModal, employeeId, resultsFound,loaded} =this.state;
        const {input}= this.state.form;
        if(!loaded){
            return <h2>Loading</h2>;
        }
        const pageNumber= this.props.employees.pageInfo.pageable.pageNumber;         
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg">
                        <div className="jumbotron text-center">
                            <div className="row justify-content-end">
                                <button onClick={()=>this.props.history.push("/")} className="btn btn-outline-secondary logout">Logout</button>
                            </div>
                            <h1>Welcome to Java Bank!</h1> 
                            <p>You can bank on us to store your data!</p> 
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
                                    <div className="row align-items-end ">
                                        {this.renderArrow("left")}
                                        <div className="col-md-6 col-12 justify-content-center">
                                            <div className="row align-items-end justify-content-end search-filter-div">
                                                <div className="col-9 search-input-column">
                                                    <label htmlFor="name">Search Filter</label>
                                                    <input placeholder= "Enter Employee Name or ID" className="form-control" type="text" 
                                                    name="input" value={input} 
                                                    onChange= {((e)=>this.handleInput(e))}/>
                                                </div>
                                                <div className="col-3 search-input-button">
                                                    <button className="btn btn-primary">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div onClick= {()=>this.prevPage()} 
                                            className={pageNumber >0? "previousButtonMobile col-6 left-arrow": "previousButtonMobile col-6 hide-arrow"}>
                                            <img src={leftArrow}/> Previous Page
                                        </div>
                                        {this.renderArrow("right")}
                                    </div>
                                </div>
                            </form>
                        <div className="inside-table-container">
                        <table className="table table-responsive-sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Number</th>
                                    <th>Supervisor</th>
                                    <th>Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {input===''? this.renderEmployees(): this.filterList()}
                            </tbody>
                        </table>
                        </div>
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
        allEmployees: state.allEmployees,
        }
}
export default connect(mapStateToProps, {fetchEmployeeData, deleteEmployee, getAllEmployees}) (Home);
