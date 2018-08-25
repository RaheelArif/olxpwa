import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function allAdsReducer(state = initialState.ads, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_ALL_ADS_SUCCESS:
      return objectAssign(
        [],
        action.payload
      );

    default:
      return state;
  }
}
