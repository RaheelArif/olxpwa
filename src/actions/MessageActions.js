import * as types from '../constants/constants';

export function sendMessage(messageObject) {
  return {
    type: types.SEND_MESSAGE,
    payload: messageObject
  }
}

export function loadMyMessages(userId) {
  return {
    type: types.LOAD_MY_MESSAGES,
    payload: userId
  }
}

export function loadMyMessagesSuccess(messages) {
  return {
    type: types.LOAD_MY_MESSAGES_SUCCESS,
    payload: messages
  }
}

export function deleteMessage(msgId) {
  return {
    type: types.DELETE_MESSAGE,
    payload: msgId
  }
}