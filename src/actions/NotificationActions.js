import * as types from '../constants/constants';

export function requestNotificationPermission() {
  console.log('requestNotificationPermission action triggered');
  return {
    type: types.REQUEST_NOTIFICATION_PERMISSION,
  }
}

export function sendNotification(receiverId, notification) {
  console.log('sendNotification action triggered');
  let payload = {
    userId: receiverId,
    notification: notification
  }
  return {
    type: types.SEND_NOTIFICATION,
    payload: payload,
  }
}
