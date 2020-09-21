import React from 'react';

import { Container, Icon } from './styles';

function LoadingIcon() {
  return (
    <Container>
      <Icon />
      <span>Carregando...</span>
    </Container>
  );
}

export default LoadingIcon;
