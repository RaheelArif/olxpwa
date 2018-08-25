import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/constants';

export default function adminReducer(state = initialState.admin, action) {
  // let newState;
  switch (action.type) {
    case types.LOAD_DASHBOARD_INFO_SUCCESS:
      return objectAssign(
        {},
        {...state},
        {dashboard: action.payload}
      );

    case types.LOAD_ALL_USERS_SUCCESS:
      // return state;
      return objectAssign(
        {},
        {...state},
        {users: action.payload}
      );

      case types.LOAD_SITE_SETTINGS_SUCCESS:
      // return state;
      return objectAssign(
        {},
        {...state},
        {siteSettings: action.payload}
      );

    default:
      return state;
  }
}
