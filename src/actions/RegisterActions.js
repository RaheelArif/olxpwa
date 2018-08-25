import * as types from '../constants/constants';

export function registerUser(user) {
  return {
    type: types.REGISTER_USER,
    payload: user
  }
}