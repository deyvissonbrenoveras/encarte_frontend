import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', { name, email, password });
    history.push('/login');
  } catch (err) {
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
    yield call(api.post, 'sessions', { email, password });
  } catch (err) {
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao fazer login, por favor entre em contato com nossa equipe'
    );
  }
}

export default all([
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
