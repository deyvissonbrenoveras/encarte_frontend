import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import api from '../../services/api';
import LoadingIcon from '../LoadingIcon';
import { Container } from './styles';

function ChooseStores({ name }) {
  const { registerField, fieldName, defaultValue, error } = useField(name);
  const ref = useRef([]);
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState(defaultValue || []);

  useEffect(() => {
    async function getStores() {
      try {
        setLoading(true);
        const response = await api.get('stores');
        setStores(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
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
  function parseValue(elementRef) {
    console.tron.log(elementRef);
    return selectedStores;
  }
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: '',
      parseValue,
    });
  }, [selectedStores, fieldName]);
  return (
    <>
      <label>Selecione as lojas:</label>
      <Container>
        {loading ? (
          <LoadingIcon />
        ) : (
          <ul>
            {stores &&
              stores.map((store) => (
                <li>
                  <img src={store.logo.url} alt={store.name} />
                  {store.name}
                  <input
                    type="checkbox"
                    id={store.id}
                    value={store.id}
                    onChange={() => handleChange(store.id)}
                    defaultChecked={selectedStores.includes(store.id)}
                  />
                </li>
              ))}
          </ul>
        )}
      </Container>
      {error && <span>{error}</span>}
    </>
  );
}

export default ChooseStores;

ChooseStores.propTypes = {
  name: PropTypes.string.isRequired,
};
