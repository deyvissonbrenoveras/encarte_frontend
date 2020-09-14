import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    const response = yield call(api.post, 'users', {
      name,
      email,
      password,
    });
    console.log(response.data);
    history.push('/login');
  } catch (err) {
    toast.error(
      err.response.data
        ? err.response.data.error
        : 'Erro ao criar conta, por favor entre em contato com nossa equipe'
    );
  }
}

export default all([takeLatest('@auth/SIGN_UP_REQUEST', signUp)]);
