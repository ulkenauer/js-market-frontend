/* import "core-js/stable";
import "regenerator-runtime/runtime"; */

import React from "react";
import thunkMiddleware from 'redux-thunk'
import ReactDOM from "react-dom";
//import App from "./components/App.js";
import App from "./containers/App.js";
/* import Auth from "./components/Auth/Auth"; */
import AuthContainer from "./containers/AuthContainer";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import rootReducer from './reducers'
import {initializeToken, fetchIdentity, login} from './actions/index'
import { createBrowserHistory } from "history";

/* const customHistory = createBrowserHistory(); */

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
}

/* const authMiddleware = store => next => action => {
    console.log('auth middleware is on')
    let result = next(action)
    console.log(result)
    if (store.getState().user.token === null) {
        console.log(store.getState().user)
        console.log('LOGGED OUT, REDIRECTING')
        customHistory.push('/auth')
    }
    return result
} */

const store = createStore(rootReducer, applyMiddleware(logger, thunkMiddleware, /* authMiddleware */))
//const store = createStore(() => { })

store.dispatch(initializeToken())
//store.dispatch(fetchIdentity())
//store.dispatch(login({ phone: '89131719408', password: '12345'}))

ReactDOM.render(
    <Provider store={store}>
        <Router /* history={history} */>
            <Switch> 
                {/* <Route path="/auth" component={Auth} /> */}
                <Route path="/auth" component={AuthContainer} />
                <Route path="/" component={App} />
                <Route path="*">
                    <div>404</div>
                </Route>
            </Switch> 
        </Router>
    </Provider>,
    document.getElementById('root'));