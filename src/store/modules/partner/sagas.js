import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { partnerFailure } from './actions';

function* addPartnerRequest({ payload, successCb }) {
  try {
    const response = yield call(api.post, 'partners', payload);
    const { id } = response.data;
    toast.success('O parceiro foi cadastrado com sucesso');
    const { stores } = payload;
    yield call(api.post, `partners_stores/${id}`, { stores });
    toast.success('O parceiro foi vinculado às lojas selecionadas');
    successCb();
  } catch (err) {
    yield put(partnerFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao cadastrar o parceiro'
    );
  }
}
function* updatePartnerRequest({ payload }) {
  const { id, partner, removeStores, addStores } = payload;
  try {
    yield call(api.put, `partners/${id}`, partner);
    toast.success('O parceiro foi editado com sucesso');

    if (addStores && addStores.length > 0) {
      yield call(api.post, `partners_stores/${id}`, { stores: addStores });
      toast.success('Novas lojas adicionadas');
    }
    if (removeStores && removeStores.length > 0) {
      yield call(api.put, `partners_stores/${id}`, { stores: removeStores });
      toast.success('Algumas lojas foram removidas');
    }
  } catch (err) {
    yield put(partnerFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao editar o parceiro'
    );
  }
}
export default all([
  takeLatest('@partner/ADD_REQUEST', addPartnerRequest),
  takeLatest('@partner/UPDATE_REQUEST', updatePartnerRequest),
]);
