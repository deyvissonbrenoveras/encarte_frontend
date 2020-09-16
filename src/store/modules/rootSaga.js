import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import store from './store/sagas';

export default function* rootSaga() {
  return yield all([auth, store]);
}
