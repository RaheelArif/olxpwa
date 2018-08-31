const Subscription = require('../Models/Subscription');
const webpush = require('web-push');

const NotificationController = {
  subscribe: function (subscriptionObj) {
    return new Promise((resolve, reject) => {
      let userId = subscriptionObj.userId;
      let subscription = subscriptionObj.subscription;
      // let newSubscription = new Subscription();
      let newSubscription = {};
      newSubscription.userId = userId;
      newSubscription.endpoint = subscription.endpoint;
      newSubscription.auth = subscription.keys.auth;
      newSubscription.p256dh = subscription.keys.p256dh;

      Subscription.findOneAndUpdate({userId: userId}, newSubscription, {new: true, upsert: true}, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Subscription Saved", status: "ok", result: result });
        }
      });
    });
  },

  getSubscriptionByUserId: function (userId) {
    return new Promise(function (resolve, reject) {
      let query = Subscription.find({ userId: userId });
      query.exec(function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    });
  },

  showNotificationById: function (userId, notification) {
    return new Promise(function (resolve, reject) {
      Subscription.findOne({ userId: userId }, function (err, sub) {
        if (err) {
          reject(err);
        } else {

          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              auth: sub.auth,
              p256dh: sub.p256dh
            }
          };
          let payload = JSON.stringify(notification);
          webpush.sendNotification(pushSubscription, payload)
            .then(() => {
              resolve('ok');
            })
            .catch(err => { throw err; });
        }
      });
    });

/*
    // Send 201 - resource created response
    res.status(201).json({});

    const notification = { title: "Push Notification Test" };
    // Create a Payload
    const payload = JSON.stringify(notification);
    // const payload = "something";

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload)
      .catch(err => { throw err; });
      */
  }
};

module.exports = NotificationController;