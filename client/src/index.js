//REACT
import React from 'react'
import ReactDOM from 'react-dom'
//REDUX
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
//User defined reducers
import  reducers  from './reducers'
//APP
import App from './App'
import './index.css'

//Create Redux Store
const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('root'))