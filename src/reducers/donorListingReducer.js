import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function donorLitsingsReducer(state = initialState.donorListings, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_DONOR_LISTINGS_SUCCESS:
      return objectAssign(
        [],
        action.payload
      );

    default:
      return state;
  }
}
