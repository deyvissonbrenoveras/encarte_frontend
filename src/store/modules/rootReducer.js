import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import store from './store/reducer';

export default combineReducers({
  auth,
  user,
  store,
});
