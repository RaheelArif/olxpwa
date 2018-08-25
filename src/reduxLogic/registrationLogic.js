import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import axios from 'axios';
const url = types.API_URL;
import toastr from 'toastr';

const registerUserLogic = createLogic({
  type: types.REGISTER_USER, // only apply this logic to this type
  // I dont want to skip the user registration if new user action has been fired before
  // completion of the previous one, so I will make latest as false
  latest: false, // complete all fired actions without skipping.
  process({ action }, dispatch, done) {
    axios.post(url+'registration/user', {
      user: action.payload
    })
    .then(resp => {
      toastr.info(resp.data);
    })
    .catch(err => {
      toastr.error(err);
    })
    .then(() => done());

    /*
    // it is more convenient to use axios api instead of fetch api
    // so I used axios library to communicate with server, here is a
    // fetch sample for same work, i.e sending request to server
    fetch(url+'registration/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: action.payload})
    })
    .then(r => {
      console.log(r.json());
    })
    .catch(error => {
      console.error(error);
    })
    .then(() => done());
    */
  }
});

export default [
  registerUserLogic,
];