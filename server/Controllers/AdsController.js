const Ad = require('../Models/Ad');
const adsPerPage = require('../serverConfig').adsPerPage;
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

  getAllAds: function (offset) {
    return new Promise(function (resolve, reject) {
      let skip = offset ? parseInt(offset) : 0;
      let query = Ad.find();
      query.skip(skip);
      query.limit(adsPerPage);
      query.sort('-createdAt');
      query.populate('uploader', '-password');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
/*
  getAllAds: function (lastCreatedAt) {
    return new Promise(function (resolve, reject) {

      // let query = Ad.find();
      // query.populate('uploader', '-password');

      let query;
      if (lastCreatedAt) {
        query = Ad.find({ createdAt: { $lt: lastCreatedAt } });
      } else {
        query = Ad.find();
      }
      query.limit(1);
      query.sort('-createdAt');
      query.populate('uploader', '-password');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },
*/
  getTotalAdsCount: function () {
    return new Promise(function (resolve, reject) {
      Ad.estimatedDocumentCount((err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
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

  getMyAdById: function (adId, userId) {
    return new Promise(function (resolve, reject) {
      let query = Ad.findOne({_id: adId, uploader: userId});
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
      Ad.aggregate([{
        $group: {
          _id: "$category",
          count: {$sum: 1}
        }
      }]).exec(function(err, result){
        if(err) {
          reject(err);
        }else{
          resolve(result)
        }
      });
    });
  },

  viewLater: function (userId, adId) {
    return new Promise(function (resolve, reject) {
      Ad.findOneAndUpdate({ _id: adId }, { $addToSet: { favorites: userId } }, function (error, ad) {
        if (error) {
          reject({ status: 'error', error: error });
        } else if (ad) {
          resolve("Ad saved to view later");
        }
      });
    });
  },

  removeSavedListing: function (userId, adId) {
    return new Promise(function (resolve, reject) {
      Ad.findOneAndUpdate({ _id: adId }, { $pull: { favorites: userId } }, function (error, ad) {
        if (error) {
          reject({ status: 'error', error: error });
        } else if (ad) {
          resolve({ status: 'ok', message: 'Ad listing removed from saved listings', error: null, ad: ad });
        }
      });
    });
  },
}

module.exports = AdController;