import { toast } from 'react-toastify';
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import { loadUsersSuccess } from './actions';

function* loadUsersRequest() {
  try {
    const response = yield call(api.get, 'users');
    yield put(loadUsersSuccess(response.data));
  } catch (err) {
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}
function* updateRequest({ payload }) {
  const { id, user, removeStores, addStores } = payload;
  try {
    const response = yield call(api.put, `users/${id}`, user);
    console.tron.log(response.data);
    toast.success('O usuário foi editado com sucesso');
    if (addStores && addStores.length > 0) {
      yield call(api.post, `users_stores/${id}`, { stores: addStores });
      toast.success('Novas lojas adicionadas');
    }
    if (removeStores && removeStores.length > 0) {
      yield call(api.put, `users_stores/${id}`, { stores: removeStores });
      toast.success('Algumas lojas foram removidas');
    }
  } catch (err) {
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}

export default all([
  takeLatest('@user/LOAD_USERS_REQUEST', loadUsersRequest),
  takeLatest('@user/UPDATE_REQUEST', updateRequest),
]);
