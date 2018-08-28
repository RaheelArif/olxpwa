import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function savedAdsReducer(state = initialState.savedAds, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_SAVED_ADS_SUCCESS:
      return objectAssign(
        [],
        action.payload
      );

    // we can implement to remove all saved ads on LOGOUT here, but let's not to do that
    // because user wants to see them later as well.

    default:
      return state;
  }
}
