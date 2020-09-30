import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { productFailure, updateProductSuccess } from './actions';

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

function* updateProductRequest({ payload }) {
  const { id, product, removeStores, addStores } = payload;
  console.tron.log(addStores);
  try {
    yield call(api.put, `products/${id}`, product);
    toast.success('O produto foi editado com sucesso');

    if (addStores && addStores.length > 0) {
      yield call(api.post, `products_stores/${id}`, { stores: addStores });
      toast.success('Novas lojas adicionadas');
    }
    if (removeStores && removeStores.length > 0) {
      yield call(api.put, `products_stores/${id}`, { stores: removeStores });
      toast.success('Algumas lojas foram removidas');
    }
  } catch (err) {
    yield put(productFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao editar o produto'
    );
  }
}

export default all([
  takeLatest('@product/ADD_REQUEST', addProductRequest),
  takeLatest('@product/UPDATE_REQUEST', updateProductRequest),
]);
