import React from 'react';
import { Error } from '@material-ui/icons';
import { Container } from './styles';

function NotFound() {
  return (
    <Container>
      <Error />
      <h1>Página não encontrada</h1>
    </Container>
  );
}

export default NotFound;
