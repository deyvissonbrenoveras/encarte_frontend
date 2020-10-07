import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { partnerFailure } from './actions';

function* addPartnerRequest({ payload }) {
  try {
    const response = yield call(api.post, 'partners', payload);
    const { id } = response.data;
    toast.success('O parceiro foi cadastrado com sucesso');
    const { stores } = payload;
    yield call(api.post, `partners_stores/${id}`, { stores });
    toast.success('O parceiro foi vinculado às lojas selecionadas');
  } catch (err) {
    yield put(partnerFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao cadastrar o parceiro'
    );
  }
}

export default all([takeLatest('@partner/ADD_REQUEST', addPartnerRequest)]);
