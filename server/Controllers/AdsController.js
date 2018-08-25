// const config = require('../serverConfig');
const categories = require('../../src/constants/categories'); // array of categories
const Ad = require('../Models/Ad');
// const objectAssign = require('object-assign');
// const isAlphanumeric = require('validator/lib/isAlphanumeric');
// const isEmpty = require('validator/lib/isEmpty');
// const isNumeric = require('validator/lib/isNumeric');
// const isEmail = require('validator/lib/isEmail');
// const isAlpha = require('validator/lib/isAlpha');
// Ad.on('index', function(error) {
//   // "_id index cannot be sparse"
//   console.log(error.message);
// });

const AdController = {
  createNewAd: function (ad, imgNames) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      if (imgNames.length < 1) {
        imgNames = ['430x275.png']; //default image
      }
      let newAd = new Ad();
      newAd.title = ad.adTitle;
      newAd.category = ad.category;
      newAd.model = ad.model;
      newAd.condition = ad.condition;
      newAd.price = ad.price
      newAd.description = ad.adDescription;
      newAd.uploader = ad.user;
      newAd.images = imgNames;
      newAd.sellerName = ad.sellerName;
      newAd.itemCity = ad.itemCity;
      newAd.sellerPhoneNumber = ad.sellerPhoneNumber;

      newAd.save(function (error, ad) {
        if (error) {
          reject({ message: 'Error in saving your ad, please make sure that you have provided the complete details.', error: error, ad: null });
        } else {
          resolve({ message: 'Ad saved', error: null, ad: ad });
        }
      });
    });
  },

  getAllAds: function () {
    return new Promise(function (resolve, reject) {
      let query = Ad.find();
      query.populate('uploader', '-password');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  getAdById: function (adId) {
    return new Promise(function (resolve, reject) {
      let query = Ad.findById(adId);
      query.populate('uploader', '-password');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  getMyAdsListings: function (user) {
    return new Promise(function (resolve, reject) {
      let query = Ad.find({ uploader: user.id });
      query.populate('uploader', '-password');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  filterAds: function (filters) {
    // let filter = listingInfo.filter;
    // let filterValue = listingInfo.filterValue;
    return new Promise(function (resolve, reject) {
      /*
       filter will be different each time so using its value
       i.e if filter = 'category' then query will be find 'category' = filterValue;
       thses brackets "[]" are the part of syntax if want to provide a value from variable.
       if I provide without "[]" brackets, it will search for a key of "filter" = "filterValue"
      */
      // let query = Ad.find({[filter]: filterValue});
      let query = Ad.find(filters);
      query.populate('uploader');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  searchAdsListings: function (searchQuery) {
    return new Promise(function (resolve, reject) {
      var searchRegex = new RegExp(searchQuery, 'i');
      // let query = Ad.find({$text: {$search: searchQuery}});
      let query = Ad.find().or([
        { 'title': { $regex: searchRegex } },
        { 'description': { $regex: searchRegex } }
      ]);
      query.populate('uploader', '-password');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  },

  updateAdListing: function (adListing, filesImgNames) {
    return new Promise(function (resolve, reject) {

      let fileCounter = 0;
      let imgNames = [];
      for (var x = 0; x < 4; x++) {
        if (adListing[`old_image_${x}`]) {
          imgNames.push(adListing[`old_image_${x}`]);
        } else if (filesImgNames[fileCounter]) {
          imgNames.push(filesImgNames[fileCounter]);
          fileCounter++;
        }
      }

      if (imgNames.length < 1) {
        imgNames = ['430x275.png']; //default image
      }
      let updatedListing = {};
      updatedListing.title = adListing.adTitle;
      updatedListing.category = adListing.category;
      updatedListing.model = adListing.model;
      updatedListing.condition = adListing.condition;
      updatedListing.price = adListing.price
      updatedListing.description = adListing.adDescription;
      updatedListing.uploader = adListing.user;
      updatedListing.images = imgNames;
      updatedListing.sellerName = adListing.sellerName;
      updatedListing.itemCity = adListing.itemCity;
      updatedListing.sellerPhoneNumber = adListing.sellerPhoneNumber;

      Ad.findOneAndUpdate({ _id: adListing._id }, updatedListing, { new: true }, function (error, ad) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve({ status: 'ok', message: 'Ad Updated', error: null, ad: ad });
        }
      });
    });
  },

  deleteAdListing: function (id) {
    return new Promise(function (resolve, reject) {
      Ad.deleteOne({ _id: id }, function (error) {
        if (error) {
          reject({ status: 'error', error: error });
        } else {
          resolve({ status: 'ok', message: 'Your Ad Listing has been deleted', error: null });
        }
      });
    });
  },

  getCategorisCounts: function () {
    return new Promise(function (resolve, reject) {
      let categoryCounts = {};
      categories.map(function (cat, index) {
        Ad.countDocuments({ category: cat }, function (error, count) {
          if (error) {
            reject(error);
          } else {
            categoryCounts[cat] = count;
            // resolve({ status: 'ok', message: 'Your Ad Listing has been deleted', error: null });
          }
          if(index === categories.length - 1) {
            resolve(categoryCounts);
          }
        });
      });
    });
  },
  /*
    wannaHelp: function (listingInfo) {
      const listingId = listingInfo.listingId;
      const userId = listingInfo.userId;
      return new Promise(function (resolve, reject) {
        Listing.findOneAndUpdate({ _id: listingId }, { $addToSet: { favorites: userId } }, function (error) {
          if (error) {
            reject({ status: 'error', error: error });
          } else {
            resolve({ status: 'ok', message: 'Listing added to your favored listing', error: null });
          }
        });
      });
    },
    getDonorListings: function (user) {
      return new Promise(function (resolve, reject) {
        let query = Listing.find({ favorites: user.id });
        // query.populate('uploader');
        query.exec(function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
      });
    },
    deleteDonorListing: function (listingInfo) {
      const listingId = listingInfo.listingId;
      const userId = listingInfo.userId;
      return new Promise(function (resolve, reject) {
        Listing.findOneAndUpdate({ _id: listingId }, { $pull: { favorites: userId } }, function (error) {
          if (error) {
            reject({ status: 'error', error: error });
          } else {
            resolve({ status: 'ok', message: 'Listing removed from favorites', error: null });
          }
        });
      });
    },
  */

}

module.exports = AdController;