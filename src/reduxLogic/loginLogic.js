import { createLogic } from 'redux-logic';
import { sessionService } from 'redux-react-session';
import * as types from '../constants/constants';
import * as loginActions from '../actions/LoginActions';
import axios from 'axios';
import toastr from 'toastr';

const url = types.API_URL;

const loginUserLogic = createLogic({
  type: types.LOGIN_USER, // only apply this logic to this type
  debounce: 250,
  latest: true,
  process: function ({ getState, action }, dispatch, done) { //eslint-disable-line no-unused-vars
    axios.post(url + 'login/user', {
      email: action.payload.email,
      password: action.payload.password
    })
      .then(serverResponse => serverResponse.data)
      .then(resp => {
        if (resp.status == "ok") {
          sessionService.saveSession(resp.user)
            .then(() => {
              sessionService.saveUser(resp.user)
                .then(() => {
                  toastr.success('Login successful');
                });
            })
        } else {
          // display an invalid message
          // we have two different messages here in resp.message, which will tell us exactly
          // either email is wrong or password is wrong.
          // but we will display only the generic message to user for security reasons.
          toastr.error(resp.message);
        }
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => {
        done();
      });
  }
});

const logoutLogic = createLogic({
  type: types.LOGOUT,
  latest: true,
  process({ getState, action }, dispatch, done) { // eslint-disable-line no-unused-vars
    // first logout from server,
    axios.get(url + 'logout')
      .then(() => {
        // then delete session
        sessionService.deleteSession()
          .then(() => {
            // then delete user from session
            sessionService.deleteUser()
              .then(() => {
                // then dispatch logout action to remove any thing in the redux store related to the logged in user.
                dispatch(loginActions.logoutSuccess());
                toastr.success('Logout successful');
                done();
              })
          })
      });
  }
});

// pollsLogic
export default [
  loginUserLogic,
  logoutLogic,
];