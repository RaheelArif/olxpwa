import { createLogic } from 'redux-logic';
// import { sessionService } from 'redux-react-session';
import * as types from '../constants/constants';
import axios from 'axios';
import uf from '../constants/UtilityFunctions';
import toastr from 'toastr';
const url = types.API_URL;
const pubKey = types.pubKey;

const requestNotificationPermission = createLogic({
  type: types.REQUEST_NOTIFICATION_PERMISSION, // only apply this logic to this type
  validate({ getState, action }, allow) {
    let state = getState();
    if (state.session.authenticated && state.session.user.id) {
      allow(action);
    }
  },
  process: function ({ getState, action }, dispatch, done) { //eslint-disable-line
    // cannot get the user's userId at login action, since it will trigger immediately after
    // login function and userId is not set yet in the state.

    // so triggering it on load_my_messages Action.
    var state = getState();
    var userId = state.session.user.id;
    if(!navigator.serviceWorker) return;
    navigator.serviceWorker.ready.then(sw => sw)
    .then(sw => {
      sw.pushManager.getSubscription()
      .then(sub => {
        if(sub === null) {
          sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: uf.urlBase64ToUint8Array(pubKey)
          }).then(sub => {
            // in nesting promises, the userId variable is not available;
            axios.post(url + 'notifications/subscribe', {
              notificationObj: {
                userId: userId,
                subscription: sub,
              }
            }).then(resp => {
                if (resp.data.status.toLowerCase() == "ok") {
                  toastr.success("Thanks for the permission, we will send the important notifications to your device");
                }
              }).catch(err => {
                console.error('error in subscription', err); //eslint-disable-line
              }).then(() => done());
          }).catch(
            // err => console.log(err)
          ).then(() => done());
        }
      })
      .catch((err) => { //eslint-disable-line
        // probably user has declined to receive the messages;
        toastr.info("OK, We will not bother you with push notifications");
        // console.log(err);
      });
    });
  }
});

const sendNotificationLogic = createLogic({
  type: types.SEND_NOTIFICATION, // only apply this logic to this type

  process: function ({ getState, action }, dispatch, done) { //eslint-disable-line
    // since action.payload is already a FormData instance, so need to append uploader user here
    // var state = getState();
    let payload = action.payload;
    let userId = payload.userId;
    let notification = payload.notification;
    // let subscription;
    // gb is a global variable set to access whenever required
    // let sw = window.gb.sw;
    axios.post(url + 'notifications/showNotificationById', {
      userId: userId,
      notification: notification
    }).then(resp => { //eslint-disable-line
      // if(resp.data.toLowerCase() === "ok") { // notification sent }
      // console.log('Notification sent to userId '+userId, resp);
    }).catch(err => { //eslint-disable-line
      // toastr.error(err);
      // console.error('error in subscription', err);
    }).then(() => done());
  }
});

// pollsLogic
export default [
  requestNotificationPermission,
  sendNotificationLogic,
];
