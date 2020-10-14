import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { categoryFailure } from './actions';

function* addCategoryRequest({ payload }) {
  try {
    yield call(api.post, 'categories', payload);
    toast.success('A categoria foi cadastrada com sucesso');
  } catch (err) {
    yield put(categoryFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao cadastrar a categoria'
    );
  }
}
function* updateCategoryRequest({ payload }) {
  const { id, category } = payload;
  try {
    yield call(api.put, `categories/${id}`, category);
    toast.success('A categoria foi editada com sucesso');
  } catch (err) {
    yield put(categoryFailure());
    toast.error(
      err.response.data ? err.response.data.error : 'Erro ao editar a categoria'
    );
  }
}
export default all([
  takeLatest('@category/ADD_REQUEST', addCategoryRequest),
  takeLatest('@category/UPDATE_REQUEST', updateCategoryRequest),
]);
