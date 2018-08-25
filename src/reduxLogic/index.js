import registrationLogic from './registrationLogic';
import loginLogic from './loginLogic';
import adsLogic from './adsLogic';
import messageLogic from './messageLogic';

export default [
  ...registrationLogic,
  ...loginLogic,
  ...adsLogic,
  ...messageLogic,
];