import { takeLatest, all, put } from 'redux-saga/effects';
import { loadCitiesSuccess } from './actions';

export function* loadCitiesRequest() {
  yield put(loadCitiesSuccess([{id: '1', locationName: 'cajazeiras-pb'}]));
}

export default all([
  takeLatest('@city/LIST_CITIES_REQUEST', loadCitiesRequest),
]);
