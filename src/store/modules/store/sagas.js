import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { storeFailure } from './actions';

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

export default all([takeLatest('@store/ADD_REQUEST', addStoreRequest)]);
