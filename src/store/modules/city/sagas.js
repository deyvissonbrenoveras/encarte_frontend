import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { cityFailure, loadCitiesActiveSuccess } from './actions';

export function* loadCitiesActiveRequest() {
  try {
    const response = yield call(api.get, '/locations/active-cities');
    const resolve = response.data.filter((item) => item.city != null);

    yield put(loadCitiesActiveSuccess(resolve));
  } catch (err) {
    yield put(cityFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}

export default all([
  takeLatest('@city/LIST_CITIES_ACTIVE_REQUEST', loadCitiesActiveRequest),
]);
