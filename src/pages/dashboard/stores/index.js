import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

import { Container, StoreList } from './styles';

function Stores() {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    async function getStores() {
      const response = await api.get('stores');
      setStores(response.data);
    }
    getStores();
  }, []);
  return (
    <Container>
      <h2>Lojas</h2>
      <StoreList>
        {stores.map((store) => (
          <li>
            <img src={store.logo && store.logo.url} alt={store.name} />
            {store.name}
          </li>
        ))}
      </StoreList>
    </Container>
  );
}
export default Stores;
