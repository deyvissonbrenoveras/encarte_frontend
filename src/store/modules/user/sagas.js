import { toast } from 'react-toastify';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { loadUsersSuccess } from './actions';

function* loadUsersRequest() {
  try {
    const response = yield call(api.get, 'users');
    console.tron.log(response.data);
    yield put(loadUsersSuccess(response.data));
  } catch (err) {
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}

export default all([takeLatest('@user/LOAD_USERS_REQUEST', loadUsersRequest)]);
