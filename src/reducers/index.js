import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import allAdsReducer from './allAdsReducer';
import myAdsReducer from './myAdsReducer';
import myMessagesReducer from './myMessagesReducer';
import catCounts from './catCountReducer';
// import people from "./peopleReducer";
// import registrations from "./registrationReducer";
// import loggedInUser from './loginReducer';
// import donorListingReducer from './donorListingReducer';
// import adminReducer from './adminReducer';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  routing: routerReducer,
  session: sessionReducer,
  allAds: allAdsReducer,
  myAds: myAdsReducer,
  myMessages: myMessagesReducer,
  categoryCounts: catCounts,
});

export default rootReducer;