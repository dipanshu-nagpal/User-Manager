import axios from 'axios';
import { tokenConfig } from './auth';

import { GET_USERS, ADD_USER } from './types';

// GET USERS
export const getUsers = () => (dispatch, getState) => {
  axios
    .get('/api/users/', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data.detail));
};

// ADD USER
export const addUser = (user) => (dispatch, getState) => {
  axios
    .post('/api/users/', user, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_USER,
        payload: res.data,
      });
    })
    .catch((err) => window.alert(err.response.data.detail));
};
