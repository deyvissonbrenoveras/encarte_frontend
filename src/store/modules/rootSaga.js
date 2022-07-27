import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import store from './store/sagas';
import city from './city/sagas';
import user from './user/sagas';
import product from './product/sagas';
import partner from './partner/sagas';
import category from './category/sagas';
import showcase from './showcase/sagas';
import log from './log/sagas';

export default function* rootSaga() {
  return yield all([
    auth,
    store,
    city,
    user,
    product,
    partner,
    category,
    showcase,
    log,
  ]);
}
