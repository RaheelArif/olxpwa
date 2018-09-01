const express = require('express');
const router = express.Router();
// const vapidKeys = require('../serverConfig').vapidKeys;
const webpush = require('web-push');
const NotificationContoller = require('../Controllers/NotificationController');
// const logoutUser = require('../Controllers/logout');
// const path = require('path');
// const fs = require('fs');
// controllers

// serve static images
router.route('/subscribe').post(
  function (req, res) {
    // need to store this subscription into the database on subscribe route
    // subscriptionObj must be an object of having two keys, 1. "userId", 2."subscription" object
    NotificationContoller.subscribe(req.body.notificationObj)
    .then(resp => {
      res.json(resp.status);
    })
    .catch(err => {
      res.send(err);
    });
  }
);

router.route('/sendNotification').post(
  function (req, res) {
    // Get subscription object from body
    const subscription = req.body;

    // Send 201 - resource created response
    res.status(201).json({});

    const notification = { title: "Push Notification Test" };
    // Create a Payload
    const payload = JSON.stringify(notification);
    // const payload = "something";

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload)
      .catch(err => {throw err;});
  }
);

router.route('/showNotificationById').post(
  function (req) {
    NotificationContoller.showNotificationById(req.body.userId, req.body.notification);
  }
);


module.exports = router;