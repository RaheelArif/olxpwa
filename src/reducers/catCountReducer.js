import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function catCountsReducer(state = initialState.catCounts, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_CATEGORIES_COUNTS_SUCCESS:
      return objectAssign (
        {},
        action.payload
      );

    default:
      return state;
  }
}