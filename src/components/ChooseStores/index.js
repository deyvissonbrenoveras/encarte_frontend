import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { Container } from './styles';

function ChooseStores() {
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);

  useEffect(() => {
    async function getStores() {
      const response = await api.get('stores');
      setStores(response.data);
    }
    getStores();
  }, []);
  function handleChange(id) {
    const toggleSelected = [...selectedStores];
    const index = toggleSelected.indexOf(id);
    if (index === -1) {
      toggleSelected.push(id);
    } else {
      toggleSelected.splice(index, 1);
    }
    setSelectedStores(toggleSelected);
  }

  return (
    <Container>
      <ul>
        {stores &&
          stores.map((store) => (
            <li>
              <img src={store.logo.url} alt={store.name} />
              {store.name}
              <input
                type="checkbox"
                name="stores[]"
                id={store.id}
                value={store.id}
                onChange={handleChange}
              />
            </li>
          ))}
      </ul>
    </Container>
  );
}

export default ChooseStores;
