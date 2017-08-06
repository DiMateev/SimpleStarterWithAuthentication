import axios from 'axios';
import { browserHistory } from 'react-router';

import { 
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3000';

function handleGoodRequest(response ,dispatch) {
  // - Update state to indicate user is authenticated
  dispatch({ type: AUTH_USER });
  // - Save the JWT token
  localStorage.setItem('token', response.data.token);
  // Redirect to the route /feature
  browserHistory.push('/feature');
}

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(res => handleGoodRequest(res, dispatch))
      .catch(() => {
        // If request is bad...
        // - Show an error to user
        dispatch(authError('Bad Login Details'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => handleGoodRequest(response, dispatch))
      .catch(({ response }) => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/`, { 
      headers: { auth: localStorage.getItem('token') }
    })
      .then(response => dispatch({ 
        type: FETCH_MESSAGE,
        payload: response.data.message
      }))
      .catch();
  }
}