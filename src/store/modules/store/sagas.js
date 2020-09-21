import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { storeFailure, loadStoresSuccess } from './actions';

function* loadStoresRequest() {
  try {
    const response = yield call(api.get, 'stores');
    console.tron.log(response.data);
    yield put(loadStoresSuccess(response.data));
  } catch (err) {
    yield put(storeFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao cadastrar a loja'
    );
  }
}

function* addStoreRequest({ payload }) {
  try {
    const response = yield call(api.post, 'stores', payload);
    console.tron.log(response.data);
    toast.success('A loja foi cadastrada com sucesso');
  } catch (err) {
    yield put(storeFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao cadastrar a loja'
    );
  }
}

export default all([
  takeLatest('@store/ADD_REQUEST', addStoreRequest),
  takeLatest('@store/LOAD_STORES_REQUEST', loadStoresRequest),
]);
