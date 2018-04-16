import React, { Component } from 'react';
import Home from "./home";
import EditEmployee from './edit-employee';
import {Route} from "react-router-dom";
import Login from './login';

class App extends Component{
  render() {
    return (
        <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/edit-employee/:id" component={EditEmployee} />
        </div>
    );
  }
}
export default App;
