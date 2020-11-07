import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { loadSuccess, showcaseFailure } from './actions';

function* loadShowcaseRequest({ payload }) {
  const { url } = payload;
  try {
    const response = yield call(api.get, `store`, { params: { url } });
    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(showcaseFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao carregar as informações da loja'
    );
  }
}

export default all([takeLatest('@showcase/LOAD_REQUEST', loadShowcaseRequest)]);
