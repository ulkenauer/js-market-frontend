/* import "core-js/stable";
import "regenerator-runtime/runtime"; */

import React from "react";
import thunkMiddleware from 'redux-thunk'
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import rootReducer from './reducers'
import {initializeToken} from './actions/index'

import loadable from '@loadable/component'

const App = loadable(() => import('./containers/App.js'))
const AuthContainer = loadable(() => import('./containers/AuthContainer'))

const store = createStore(rootReducer, applyMiddleware( thunkMiddleware, ))

store.dispatch(initializeToken())

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/auth" component={AuthContainer} />
                <Route path="/" component={App} />
                <Route path="*">
                    <div>404</div>
                </Route>
            </Switch> 
        </Router>
    </Provider>,
    document.getElementById('root'));