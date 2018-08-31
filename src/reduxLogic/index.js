import registrationLogic from './registrationLogic';
import loginLogic from './loginLogic';
import adsLogic from './adsLogic';
import messageLogic from './messageLogic';
import notificationsLogic from './notificationsLogic';

export default [
  ...registrationLogic,
  ...loginLogic,
  ...adsLogic,
  ...messageLogic,
  ...notificationsLogic
];