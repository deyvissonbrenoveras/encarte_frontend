import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { productFailure } from './actions';

function* addProductRequest({ payload }) {
  try {
    yield call(api.post, 'products', payload);
    toast.success('O produto foi cadastrado com sucesso');
  } catch (err) {
    yield put(productFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao cadastrar o produto'
    );
  }
}

export default all([takeLatest('@product/ADD_REQUEST', addProductRequest)]);
