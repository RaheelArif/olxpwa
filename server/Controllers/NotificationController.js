const Subscription = require('../Models/Subscription');
const webpush = require('web-push');

const NotificationController = {
  $this: this,
  subscribe: function (subscriptionObj) {
    return new Promise((resolve, reject) => {
      let userId = subscriptionObj.userId;
      let subscription = subscriptionObj.subscription;
      let newSubscription = new Subscription();
      newSubscription.userId = userId;
      newSubscription.endpoint = subscription.endpoint;
      newSubscription.auth = subscription.keys.auth;
      newSubscription.p256dh = subscription.keys.p256dh;
      newSubscription.save(function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Subscription Saved", status: "ok", result: result });
        }
      });
      /*
      let newSubscription = {};
      newSubscription.userId = userId;
      newSubscription.endpoint = subscription.endpoint;
      newSubscription.auth = subscription.keys.auth;
      newSubscription.p256dh = subscription.keys.p256dh;
      Subscription.findOneAndUpdate({ userId: userId }, newSubscription, { new: true, upsert: true }, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Subscription Saved", status: "ok", result: result });
        }
      });
      */

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
      /*
        need to find all the subscriptions of the user, even if he
        has subscribed from multiple computers/mobile devices or both
        so findOne will not do the job, it will send notification to only
        one device. Now I need to change this to find, next time and then
        loop through the array to send the notifications to all the
        subscribed devices.
      */
      /*
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
      */
      Subscription.find({ userId: userId }, function (err, subs) {
        if (err) {
          throw err;
        } else {
          if(subs.length < 1) return;

          subs.map(function (sub) {
            const pushSubscription = {
              endpoint: sub.endpoint,
              keys: {
                auth: sub.auth,
                p256dh: sub.p256dh
              }
            };
            let payload = JSON.stringify(notification);
            webpush.sendNotification(pushSubscription, payload)
              // .then(() => {
              //   resolve('ok');
              // })
              .catch(err => { throw err; });
          });
        }
      });
  }
};

module.exports = NotificationController;