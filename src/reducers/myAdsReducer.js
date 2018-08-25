import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function myAdsReducer(state = initialState.myAdsListings, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_MY_ADS_SUCCESS:
      return objectAssign(
        [],
        action.payload
      );

    // remove myAds from store if user logs out of his account.
    case types.LOGOUT_SUCCESS:
      return [];

    default:
      return state;
  }
}