import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import createSurvey from './components/survey/create-survey';
import showSurvey from './components/survey/show-survey';
import RequireAuth from './components/auth/require-auth';
import Home from './components/home';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('x-auth');

// If we have a token, consider user authenticated
if (token) {
  // Update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='signin' component={Signin} />
        <Route path='signout' component={Signout} />
        <Route path='signup' component={Signup} />
        <Route path='create-survey' component={RequireAuth(createSurvey)} />
        <Route path='survey/:id' component={showSurvey} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('container'));
