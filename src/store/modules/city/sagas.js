import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { loadCitiesSuccess, cityFailure } from './actions';

export function* loadCitiesRequest() {
  yield put(loadCitiesSuccess([{id: '1', locationName: 'cajazeiras-pb'}]));
  // try {
  //   const response = yield call(api.get, 'locations');
  //   yield put(loadCitiesSuccess(response.data));
  // } catch (err) {
  //   yield put(cityFailure());
  //   toast.error(
  //     err.response.data
  //       ? err.response.data.error
  //       : 'Erro ao se comunicar com o servidor'
  //   );
  // }
}

export default all([
  takeLatest('@city/LIST_CITIES_REQUEST', loadCitiesRequest),
]);
