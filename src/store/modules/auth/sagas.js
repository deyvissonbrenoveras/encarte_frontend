import { all, takeLatest, call, put } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { signFailure, signInSuccess, signOut } from './actions';

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', { name, email, password });
    history.push('/login');
  } catch (err) {
    yield put(signFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao criar conta, por favor entre em contato com nossa equipe'
    );
  }
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', { email, password });
    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    console.log('SAGA ACTION SIGN IN', { token, user })
    yield put(signInSuccess(token, user));
    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao fazer login, por favor entre em contato com nossa equipe'
    );
  }
}

export function* setToken({ payload }) {
  if (!payload) {
    yield put(signOut());
    return;
  }
  const { token } = payload.auth;

  if (token) {
    const decoded = jwt.decode(token);

    if (Date.now().valueOf() / 1000 > decoded.exp) {
      yield put(signOut());
    } else {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    yield put(signOut());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
