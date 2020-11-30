import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { productFailure, loadSuccess, loadRequest } from './actions';

function* addProductRequest({ payload, successCb }) {
  try {
    const response = yield call(api.post, 'products', payload);
    const { id } = response.data;
    toast.success('O produto foi cadastrado com sucesso');
    const { stores } = payload;
    yield call(api.post, `products_stores/${id}`, { stores });
    toast.success('O produto foi vinculado às lojas selecionadas');
    successCb();
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
    yield put(loadRequest(id));
  } catch (err) {
    yield put(productFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao editar o produto'
    );
  }
}
function* loadProductRequest({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `products/${id}`);
    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(productFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao carregar o produto'
    );
  }
}
export default all([
  takeLatest('@product/ADD_REQUEST', addProductRequest),
  takeLatest('@product/UPDATE_REQUEST', updateProductRequest),
  takeLatest('@product/LOAD_PRODUCT_REQUEST', loadProductRequest),
]);
