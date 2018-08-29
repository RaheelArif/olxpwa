const express = require('express');
const router = express.Router();
const logoutUser = require('../Controllers/logout');
const path = require('path');
const fs = require('fs');
// controllers

// serve static images
router.route('/image/:image')
  .get(function (req, res) {
    let dirName = path.resolve(__dirname + '/../uploads/ads/images/');
    let defaultFileName = 'image-not-found.png';
    var fileName = dirName + "/" + req.params.image;
    if (fs.existsSync(fileName)) {
      res.sendFile(fileName);
    } else {
      res.sendFile(dirName + "/" + defaultFileName);
    }
  });

// /logout route
router.route('/logout').get(
  function (req, res) {
    if (logoutUser) {
      res.send('Logout successful');
    }
  }
);

module.exports = router;