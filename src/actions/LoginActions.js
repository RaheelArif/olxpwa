import * as types from '../constants/constants';

export function loginUser(user) {
  return {
    type: types.LOGIN_USER,
    payload: user
  }
}

export function logout() {
  return {
    type: types.LOGOUT,
  }
}

export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  }
}