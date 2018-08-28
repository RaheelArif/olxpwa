import React from 'react'; // since we are using the jsx to return, so necessary to import React here.
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import { API_URL } from "../constants/constants";
import toastr from 'toastr';
import categories from './categories';
// categories can also be stored in database.
// const categories = ['Mobiles', 'Laptops', 'Clothes', 'Vehicles', 'Accessories'];
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
    let arr = description.split(' ');
    let wrongWords = arr.filter(word => word.length > 18 ? true : false);
    if(wrongWords.length > 0)
      return false;
    else
      return true;
  }
};

export default UtilityFunctions;