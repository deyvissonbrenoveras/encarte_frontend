import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUsersRequest } from '../../../store/modules/user/actions';
import { Container } from './styles';

function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersRequest());
  }, []);
  return <Container />;
}

export default Users;
