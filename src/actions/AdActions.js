import * as types from '../constants/constants';

export function submitAd(ad) {
  return {
    type: types.SUBMIT_AD,
    payload: ad
  }
}

export function updateAd(ad) {
  return {
    type: types.UPDATE_AD,
    payload: ad
  }
}

export function deleteAd(adId) {
  return {
    type: types.DELETE_AD,
    payload: adId
  }
}

export function loadAllAds(offset) {
  return {
    type: types.LOAD_ALL_ADS,
    payload: offset
  }
}

export function loadAllAdsSuccess(ads) {
  return {
    type: types.LOAD_ALL_ADS_SUCCESS,
    payload: ads
  }
}

export function searchAds(query) {
  return {
    type: types.SEARCH_ADS,
    payload: query
  }
}

export function filterAds(filter) {
  return {
    type: types.FILTER_ADS,
    payload: filter
  }
}

export function loadMyAds() {
  return {
    type: types.LOAD_MY_ADS,
  }
}

export function loadMyAdsSuccess(ads) {
  return {
    type: types.LOAD_MY_ADS_SUCCESS,
    payload: ads
  }
}

export function loadCategoriesCounts() {
  return {
    type: types.LOAD_CATEGORIES_COUNTS,
  }
}

export function loadCategoriesCountsSuccess(catCounts) {
  return {
    type: types.LOAD_CATEGORIES_COUNTS_SUCCESS,
    payload: catCounts,
  }
}

export function adViewLater(adId) {
  return {
    type: types.AD_VIEW_LATER,
    payload: adId
  }
}

export function saveAdInCache(adId) {
  return {
    type: types.SAVE_AD_IN_CACHE,
    payload: adId
  }
}

export function loadSavedAds() {
  return {
    type: types.LOAD_SAVED_ADS,
  }
}

export function loadSavedAdsSuccess(ads) {
  return {
    type: types.LOAD_SAVED_ADS_SUCCESS,
    payload: ads
  }
}

export function removeSaved(adId) {
  return {
    type: types.REMOVE_SAVED_AD,
    payload: adId

  }
}

export function getAllAdsCount() {
  return {
    type: types.GET_ALL_ADS_COUNT
  }
}
export function getAllAdsCountSuccess(count) {
  return {
    type: types.GET_ALL_ADS_COUNT_SUCCESS,
    payload: count
  }
}