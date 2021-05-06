import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { productFailure, loadSuccess, loadRequest } from './actions';

function* addProductRequest({ payload, successCb }) {
  try {
    const response = yield call(api.post, 'products', payload);
    const { id } = response.data;
    toast.success('O produto foi cadastrado com sucesso');
    const { stores, partners } = payload;

    if (stores && stores.length > 0) {
      yield call(api.post, `products_stores/${id}`, { stores });
      toast.success('O produto foi vinculado às lojas selecionadas');
    }
    if (partners && partners.length > 0) {
      yield call(api.post, `products_partners/${id}`, { partners });
      toast.success('O produto foi vinculado aos parceiros selecionados');
    }

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
  const {
    id,
    product,
    removeStores,
    addStores,
    removePartners,
    addPartners,
  } = payload;
  try {
    yield call(api.put, `products/${id}`, product);
    toast.success('O produto foi editado com sucesso');

    if (addStores && addStores.length > 0) {
      yield call(api.post, `products_stores/${id}`, { stores: addStores });
      toast.success('Novas lojas adicionadas');
    }
    if (removeStores && removeStores.length > 0) {
      yield call(
        api.put,
        `products_stores`,
        { stores: removeStores },
        { params: { productId: id } }
      );
      toast.success('Algumas lojas foram removidas');
    }

    if (addPartners && addPartners.length > 0) {
      yield call(api.post, `products_partners/${id}`, {
        partners: addPartners,
      });
      toast.success('Novos parceiros adicionados');
    }
    if (removePartners && removePartners.length > 0) {
      yield call(
        api.put,
        `products_partners`,
        { partners: removePartners },
        { params: { productId: id } }
      );
      toast.success('Alguns parceiros foram removidos');
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
function* disassociateProductsFromStore({ payload }) {
  const { storeId, products, successCb } = payload;
  try {
    yield call(
      api.put,
      `products_stores`,
      { products },
      { params: { storeId } }
    );
    toast.success(`${products.length} produto(s) desassociado(s) da loja`);
    successCb();
  } catch (err) {
    yield put(productFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao desassociar os produtos da loja'
    );
  }
}
export default all([
  takeLatest('@product/ADD_REQUEST', addProductRequest),
  takeLatest('@product/UPDATE_REQUEST', updateProductRequest),
  takeLatest('@product/LOAD_PRODUCT_REQUEST', loadProductRequest),
  takeLatest(
    '@product/DISASSOCIATE_PRODUCTS_REQUEST',
    disassociateProductsFromStore
  ),
]);
