import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import allAdsReducer from './allAdsReducer';
import myAdsReducer from './myAdsReducer';
import myMessagesReducer from './myMessagesReducer';
import savedAdsReducer from './savedAdsReducer';
import resetFormReducer from './resetFormReducer';
import catCounts from './catCountReducer';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  routing: routerReducer,
  session: sessionReducer,
  allAds: allAdsReducer,
  myAds: myAdsReducer,
  myMessages: myMessagesReducer,
  categoryCounts: catCounts,
  savedAds: savedAdsReducer,
  resetForm: resetFormReducer,
});

export default rootReducer;