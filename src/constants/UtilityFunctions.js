import React from 'react'; // since we are using the jsx to return, so necessary to import React here.
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { API_URL } from "../constants/constants";
import toastr from 'toastr';
import categories from './categories';
// import objectAssign from 'object-assign';
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const UtilityFunctions = {

  getCategoriesDropdownList: function () {
    const categoryList = categories.map((category, index) => {
      return <MenuItem key={index} value={category} primaryText={category} />
    });
    return categoryList;
  },

  getCategories: function () {
    return categories;
  },

  getAdById: function (allAds, id) {
    return allAds.filter((ad) => ad._id == id)[0];
  },

  getAdByIdFromServer: function (id) {
    return new Promise(function (resolve, reject) {
      axios.get(`${API_URL}ads/getAdById`, {
        params: {adId: id}
      })
        .then(resp => {
          // return resp.data;
          resolve(resp.data);
        }).catch(err => {
          toastr.error(err);
          reject(err);
        })
    });
  },

  getMyAdByIdFromServer: function (adId, userId) {
    return new Promise(function (resolve, reject) {
      axios.get(`${API_URL}ads/getMyAdById`, {
        params: {adId: adId, userId: userId}
      })
        .then(resp => {
          // return resp.data;
          resolve(resp.data);
        }).catch(err => {
          toastr.error(err);
          reject(err);
        })
    });
  },

  getDateTime: function (date) {
    let month = months[date.getMonth()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    let ampm = (hours < 12) ? "am" : "pm";
    let hoursToDisplay = (hours % 12 === 0) ? 12 : hours % 12;
    let dateTime = `${month} ${date.getDate()}, ${date.getFullYear()} ${hoursToDisplay}:${minutes} ${ampm}`;
    return dateTime;
  },

  getDate: function (date) {
    let month = months[date.getMonth()];
    let dateTime = `${month} ${date.getDate()}, ${date.getFullYear()}`;
    return dateTime;
  },

  isValidInput: function(description) {
    let valid = true;
    let maxCharsPerWord = 18;
    let newLines = description.split('\n');
    let moreLines = newLines.filter(line => line.length > maxCharsPerWord)
    for (let x = 0; x < moreLines.length; x++) {
      let invalidWords = moreLines[x].split(' ').filter(word => word.length > maxCharsPerWord);
      if(invalidWords.length > 0) {
        valid = false;
        break;
      }
    }
    return valid;
  },

  urlBase64ToUint8Array: function (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+') //eslint-disable-line
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
};

export default UtilityFunctions;