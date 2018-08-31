import * as types from '../constants/constants';

export function startingForm() {
  return {
    type: types.STARTING_FORM
  }
}

export function resetFormSuccess() {
  return {
    type: types.RESET_FORM_SUCCESS
  }
}