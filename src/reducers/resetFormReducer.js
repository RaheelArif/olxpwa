import initialState from './initialState';
import * as types from '../constants/constants';

export default function resetFormReducer(state = initialState.resetForm, action) {
  // let newState;

  switch (action.type) {
    case types.RESET_FORM_SUCCESS:
      return true;

    case types.STARTING_FORM:
      return false;

    default:
      return state;
  }
}
