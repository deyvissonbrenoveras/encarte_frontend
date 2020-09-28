import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { productFailure } from './actions';

function* addProductRequest({ payload }) {
  try {
    const response = yield call(api.post, 'products', payload);
    const { id } = response.data;
    toast.success('O produto foi cadastrado com sucesso');
    const { stores } = payload;
    yield call(api.post, `products_stores/${id}`, { stores });
    toast.success('O produto foi vinculado às lojas selecionadas');
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
