import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { storeFailure, loadStoresSuccess } from './actions';

export function* loadStoresRequest({ payload }) {
  const showInactive = payload;
  try {
    const response = yield call(api.get, 'stores', {
      params: { showInactive },
    });
    yield put(loadStoresSuccess(response.data));
  } catch (err) {
    yield put(storeFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao se comunicar com o servidor'
    );
  }
}

export function* addCityCategoryRequest({ payload }) {
  
}

export function* addStateCategoryRequest({ payload }) {
  
}

export function* loadCityCategoryRequest() {
  
}

export function* loadStatesCategoryRequest() {
  
}

export default all([
  takeLatest('@storeCategory/ADD_CITY_CATEGORY', addCityCategoryRequest),
  takeLatest('@storeCategory/ADD_STATE_CATEGORY', addStateCategoryRequest),
  takeLatest('@storeCategory/LOAD_CITY_CATEGORY', loadCityCategoryRequest),
  takeLatest('@storeCategory/LOAD_STATE_CATEGORY', loadStatesCategoryRequest),
]);
