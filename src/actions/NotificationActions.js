import * as types from '../constants/constants';

export function requestNotificationPermission() {
  return {
    type: types.REQUEST_NOTIFICATION_PERMISSION,
  }
}

export function sendNotification(receiverId, notification) {
  let payload = {
    userId: receiverId,
    notification: notification
  }
  return {
    type: types.SEND_NOTIFICATION,
    payload: payload,
  }
}
