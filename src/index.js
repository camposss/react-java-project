import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/';
import promise from 'redux-promise';


ReactDOM.render(
    <Provider store={createStore(rootReducer, {}, applyMiddleware(promise))}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
