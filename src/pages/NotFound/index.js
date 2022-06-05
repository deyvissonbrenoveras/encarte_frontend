import React from 'react';
import logoImg from '../../assets/logo.webp';
import { BsArrowLeftShort } from 'react-icons/bs'

import { useHistory } from 'react-router-dom';

import { Container } from './styled'

function NotFound() {
    const history = useHistory();
    
    return (
        <Container>
          <img src={logoImg} alt="Encarte" />
          <h1>Página não encontrada</h1>
          <button onClick={() => history.goBack()}>
              <BsArrowLeftShort size={23} /> <span>Voltar</span>
          </button>
        </Container>
    );
}

export default NotFound;