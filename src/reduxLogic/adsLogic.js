import { createLogic } from 'redux-logic';
// import { sessionService } from 'redux-react-session';
import * as types from '../constants/constants';
import * as adActions from '../actions/AdActions';
import * as resetActions from '../actions/ResetActions';
import axios from 'axios';
import toastr from 'toastr';
const url = types.API_URL;

const submitAdLogic = createLogic({
  type: types.SUBMIT_AD, // only apply this logic to this type
  // debounce: 250,
  latest: true,
  validate({ getState, action }, allow) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    }
    if (!state.session.user.id) {
      toastr.error("Please login to submit your ad.");
    } else {
      allow(action);
    }
  },
  process: function ({ getState, action }, dispatch, done) {
    var fd = action.payload;
    // since action.payload is already a FormData instance, so need to append uploader user here
    var state = getState();
    fd.append('user', state.session.user.id);

    axios.post(url + 'ads/submitAd', fd)
      .then(resp => {
        toastr.info(resp.data.message);
        dispatch(resetActions.resetFormSuccess());
        // dispatch(adActions.adSubmittedSuccessful());
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const loadAllAdsLogic = createLogic({
  type: types.LOAD_ALL_ADS, // only apply this logic to this type

  process: function ({getState, action}, dispatch, done) { // eslint-disable-line no-unused-vars
    axios.get(url + 'ads/getAllAds', {
      params: {offset: action.payload}
    })
      .then(resp => {
        dispatch(adActions.loadAllAdsSuccess(resp.data));
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const filterAdsLogic = createLogic({
  type: types.FILTER_ADS, // only apply this logic to this type

  process: function ({ action }, dispatch, done) {
    axios.get(url + 'ads/filterAds', {
      params: {filters: JSON.stringify(action.payload)}
    })
      .then(resp => {
        dispatch(adActions.loadAllAdsSuccess(resp.data)); //to update the filtered ads in ui
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const loadMyAdsLogic = createLogic({
  type: types.LOAD_MY_ADS, // only apply this logic to this type
  process: function ({ getState }, dispatch, done) {
    let state = getState();
    let filters = {uploader: state.session.user.id};
    axios.get(url + 'ads/filterAds', {
      params: { filters: JSON.stringify(filters) }
    })
      .then(resp => {
        dispatch(adActions.loadMyAdsSuccess(resp.data)); //to update the filtered ads in ui
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const searchAdsLogic = createLogic({
  type: types.SEARCH_ADS, // only apply this logic to this type

  process: function ({ action }, dispatch, done) {
    axios.get(url + 'ads/searchAdsListings', {
      params: {searchQuery: JSON.stringify(action.payload)}
    })
      .then(resp => {
        dispatch(adActions.loadAllAdsSuccess(resp.data)); //to update the filtered ads in ui
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

// deleting an Ad listing
const deleteAdListingLogic = createLogic({
  type: types.DELETE_AD,
  latest: true,
  validate({ getState, action }, allow) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    } else {
      allow(action);
    }
  },

  process: function ({ action }, dispatch, done) {
    axios.post(url + 'ads/deleteAdListing', {
      adId: action.payload,
    })
      .then(response => {
        // if (response.data.status == "ok") {
        // }
        toastr.success(response.data.message);
        dispatch(adActions.loadMyAds());
        dispatch(adActions.loadAllAds());
        // load listings again,
        // if (getState().session.user.userType == "seeker") {
        //   dispatch(listingActions.loadMyListings(getState().session.user));
        // } else if (getState().session.user.userType == "admin") {
        //   dispatch(listingActions.loadAllListings());
        // }
      }).catch(error => {
        toastr.error(error);
      }).then(() => done());
  }
});

const updateAdListingLogic = createLogic({
  type: types.UPDATE_AD, // only apply this logic to this type

  validate({ getState, action }, allow) {
    let state = getState();
    if (!state.session.authenticated) {
      toastr.error('Unauthorized request');
    } else {
      allow(action);
    }
  },

  process({ getState, action }, dispatch, done) {
    let state = getState();
    // action.payload is already an instance of FormData(), so just appended new user field
    let fd = action.payload;
    fd.append('user', state.session.user.id);
    axios.post(url + 'ads/updateAdListing', fd)
      .then(resp => {
        toastr.info(resp.data.message);
        dispatch(adActions.loadMyAds());
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const getCategorisCountsLogic = createLogic({
  type: types.LOAD_CATEGORIES_COUNTS, // only apply this logic to this type

  process: function ({ action }, dispatch, done) { // eslint-disable-line no-unused-vars
    axios.get(url + 'ads/getCategorisCounts')
      .then(resp => resp.data)
      .then(data => {
        let reqData = {};
        let dataArr = Object.values(data);
        // dataArr is having array of objects of the shape of [{_id: "Laptops", count: 1}, {_id: "Mobiles": 1}]
        // required data shape => {"Laptops": 1, "Mobiles": 1}
        dataArr.map(data => {
          reqData[data._id] = data.count;
        });
        return reqData;
      }).then(reqData => {
        dispatch(adActions.loadCategoriesCountsSuccess(reqData));
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const viewAdLaterLogic = createLogic({
  type: types.AD_VIEW_LATER,
  validate({ getState, action }, allow) {
    let state = getState();
    if (!state.session.authenticated || !state.session.user.id) {
      toastr.error('You are not logged in, please login to save an ad to view later');
    } else {
      allow(action);
    }
  },

  process: function({getState, action}, dispatch, done) { //eslint-disable-line no-unused-vars
    let state = getState();
    let userId = state.session.user.id;
    axios.post(url + 'ads/viewLater', {
      adId: action.payload,
      userId: userId
    })
      .then(() => {
        // dispatch an action to save ad in cache
        dispatch(adActions.saveAdInCache(action.payload));
        toastr.success('Ad saved to view later, you will find it inside your account');
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const saveAdInCache = createLogic({
  type: types.SAVE_AD_IN_CACHE,

  process: function({getState, action}, dispatch, done) { //eslint-disable-line no-unused-vars
    /*
      this request will be intercepted in serviceWorker, and will not be sent to server,
      there is no route to match to this request on server.
    */
    axios.get(url + 'ads/getAdById', {
      params: {adId: action.payload}
    })
      .then(resp => resp.data.images)
      .then(images => {
        images.map(image => axios.get(`${url}image/${image}`));
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const loadSavedAdsLogic = createLogic({
  type: types.LOAD_SAVED_ADS, // only apply this logic to this type

  process: function ({getState, action}, dispatch, done) { // eslint-disable-line no-unused-vars
    let state = getState();
    let userId = state.session.user.id;
    let filters = { favorites: userId };
    axios.get(url + 'ads/filterAds', {
      params: {filters: JSON.stringify(filters)}
    })
      .then(resp => {
        dispatch(adActions.loadSavedAdsSuccess(resp.data));
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const removeSavedAdLogic = createLogic({
  type: types.REMOVE_SAVED_AD, // only apply this logic to this type

  process: function ({getState, action}, dispatch, done) { // eslint-disable-line no-unused-vars
    let state = getState();
    let userId = state.session.user.id;
    axios.post(url + 'ads/removeSavedAd', {
      adId: action.payload,
      userId: userId
    })
      .then(resp => {
        toastr.success(resp.data);
        dispatch(adActions.loadSavedAds());
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

const getAllAdsCount = createLogic({
  type: types.GET_ALL_ADS_COUNT, // only apply this logic to this type

  process: function ({getState, action}, dispatch, done) { // eslint-disable-line no-unused-vars
    axios.get(url + 'ads/getAllAdsCounts')
      .then(resp => {
        dispatch(adActions.getAllAdsCountSuccess(resp.data));
      })
      .catch(err => {
        toastr.error(err);
      })
      .then(() => done());
  }
});

export default [
  submitAdLogic,
  loadAllAdsLogic,
  filterAdsLogic,
  loadMyAdsLogic,
  searchAdsLogic,
  updateAdListingLogic,
  deleteAdListingLogic,
  getCategorisCountsLogic,
  viewAdLaterLogic,
  saveAdInCache,
  loadSavedAdsLogic,
  removeSavedAdLogic,
  getAllAdsCount,
];
