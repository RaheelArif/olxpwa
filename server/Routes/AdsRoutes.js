const express = require('express');
const router = express.Router();
const ensureAuthentication = require('../Controllers/EnsureAuthentication');
const AdsController = require('../Controllers/AdsController');
const fs = require('fs');
const path = require('path');

function deleteFile(filename) {
  var count = 1;
  var retries = 5;
  var retryDelay = 1000;
  if (fs.existsSync(filename)) {
    fs.unlink(filename, (error) => {/* logError(error); */ }); //eslint-disable-line no-unused-vars
  } else {
    setTimeout(() => {
      if (count <= retries) {
        deleteFile(filename);
      }
      count++;
    }, retryDelay);
  }
}

router.route('/submitAd').post(
  ensureAuthentication.userAuthentication,
  function (req, res) {
    const uploadDir = path.resolve(__dirname) + "/../uploads/ads/images";
    const formidable = require('formidable');
    let form = new formidable.IncomingForm();
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; // 10MB
    form.maxFileSize = 10 * 1024 * 1024; // 10MB
    form.multiples = true;
    form.type = 'multipart';
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.json({
          status: "failed",
          message: "Images can't be uploaded",
          error: err
        });
      } else {
        let imgNames = [];
        let maxImagesAllowed = 4;
        for (let x = 1; x <= maxImagesAllowed; x++) {
          if (files[`image-${x}`]) {
            // at local side, filename contains "\" for separator but at server side
            // filename contains "/" for separation, so first replace all "\" to "/"
            let filename = files[`image-${x}`].path.replace(/\\/g, '/');
            let nameArr = filename.split('/');
            let fName = nameArr[nameArr.length - 1];
            if (files[`image-${x}`].size >= 1) {
              imgNames.push(fName);
            } else {
              deleteFile(uploadDir + '/' + fName);
            }
          }
        }
        AdsController.createNewAd(fields, imgNames)
          .then(function (response) {
            res.json(response);
            // res.json(response);
          }).catch(function (response) {
            res.send(response.message);
          }
          );
      }
    });
  }
);

router.route('/getAllAds').get(
  function (req, res) {
    AdsController.getAllAds(req.query.offset)
      .then(ads => {
        res.json(ads);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/getAllAdsCounts').get(
  function(req, res) {
    AdsController.getTotalAdsCount()
    .then(count => {
      res.json(count);
    })
    .catch(err => {
      res.send(err);
    })
  }
)

router.route('/getAdById').get(
  function (req, res) {
    AdsController.getAdById(req.query.adId)
      .then(ad => {
        res.json(ad);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/getMyAdById').get(
  function (req, res) {
    AdsController.getMyAdById(req.query.adId, req.query.userId)
      .then(ad => {
        res.json(ad);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/viewLater').post(
  ensureAuthentication.userOrAdminAuthentication,
  function (req, res) {
    AdsController.viewLater(req.body.userId, req.body.adId)
      .then(message => {
        res.json(message);
      }).catch(error => {
        res.send(error);
      });
  }
)

router.route('/updateAdListing').post(
  ensureAuthentication.userAuthentication,
  function (req, res) {
    const formidable = require('formidable');
    let form = new formidable.IncomingForm();
    let uploadDir = path.resolve(__dirname) + "/../uploads/ads/images";
    form.uploadDir = uploadDir;
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; // 10MB
    form.maxFileSize = 10 * 1024 * 1024; // 10MB
    form.multiples = true;
    form.type = 'multipart';
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.json({
          status: "failed",
          message: "Images can't be uploaded",
          error: err
        });
      } else {
        let imgNames = [];
        let maxImagesAllowed = 4;
        for (let x = 1; x <= maxImagesAllowed; x++) {
          if (files[`image-${x}`]) {
            let filename = files[`image-${x}`].path.replace(/\\/g, '/');
            let nameArr = filename.split('/');
            let fName = nameArr[nameArr.length - 1];

            if (files[`image-${x}`].size >= 1) {
              imgNames.push(fName);
            } else {
              deleteFile(uploadDir + '/' + fName);
            }
          }
        }
        AdsController.updateAdListing(fields, imgNames)
          .then(function (response) {
            res.json(response);
          }).catch(function (error) {
            res.send(error);
          });
      }
    });
  }
);

router.route('/deleteAdListing').post(
  ensureAuthentication.userOrAdminAuthentication,
  function (req, res) {
    console;
    AdsController.deleteAdListing(req.body.adId)
      .then(response => {
        res.json(response);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/filterAds').get(
  function (req, res) {
    AdsController.filterAds(JSON.parse(req.query.filters))
      .then(ads => {
        res.json(ads);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/searchAdsListings').get(
  function (req, res) {
    AdsController.searchAdsListings(JSON.parse(req.query.searchQuery))
      .then(listings => {
        res.json(listings);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/getCategorisCounts').get(
  function (req, res) {
    AdsController.getCategorisCounts()
      .then(categoryCounts => {
        res.json(categoryCounts);
      }).catch(error => {
        res.send(error);
      });
  }
);

router.route('/removeSavedAd').post(
  ensureAuthentication.userOrAdminAuthentication,
  function (req, res) {
    console;
    AdsController.removeSavedListing(req.body.userId, req.body.adId)
      .then(resp => {
        res.json(resp.message);
      }).catch(error => {
        res.send(error);
      });
  }
);

module.exports = router;
