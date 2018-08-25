import { createLogic } from 'redux-logic';
import * as types from '../constants/constants';
import * as messageActions from '../actions/MessageActions';
import axios from 'axios';
import toastr from 'toastr';
const url = types.API_URL;

const sendMessageLogic = createLogic({
  type: types.SEND_MESSAGE, // only apply this logic to this type

  process: function ({ getState, action }, dispatch, done) { // eslint-disable-line no-unused-vars

    axios.post(url + 'messages/sendMessage', {
      messageObject: action.payload,
    })
      .then(resp => {
        toastr.info(resp.data);
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const LoadMyMessagesLogic = createLogic({
  type: types.LOAD_MY_MESSAGES,

  process: function ({getState, action}, dispatch, done) { // eslint-disable-line no-unused-vars
    axios.get(`${url}messages/getMyMessages`, {
      params: {userId: JSON.stringify(action.payload)}
    })
    .then(resp => {
      dispatch(messageActions.loadMyMessagesSuccess(resp.data));
    }).catch(err => {
      toastr.error(err);
    })
    .then(() => done());

  }
});

const deleteMessagesLogic = createLogic({
  type: types.DELETE_MESSAGE,

  process: function ({getState, action}, dispatch, done) {
    let state = getState();
    let userId = state.session.user.id;
    axios.post(`${url}messages/deleteMessage`, {
      msgId: action.payload
    })
    .then(resp => {
      toastr.success(resp.data);
      dispatch(messageActions.loadMyMessages(userId));
    }).catch(err => {
      toastr.error(err);
    })
    .then(() => done());

  }
});

export default [
  sendMessageLogic,
  LoadMyMessagesLogic,
  deleteMessagesLogic
];