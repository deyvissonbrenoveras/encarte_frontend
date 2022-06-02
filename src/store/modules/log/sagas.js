import { all, put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { logFailure, loadLogsSuccess } from './actions';

export function* loadLogsRequest({ payload }) {
  const { startDate, endDate } = payload;
  try {
    const response = yield call(api.get, 'logs', {
      params: { startDate, endDate },
    });
    yield put(loadLogsSuccess(response.data));
  } catch (err) {
    yield put(logFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}

export default all([takeLatest('@log/LOAD_LOGS_REQUEST', loadLogsRequest)]);
