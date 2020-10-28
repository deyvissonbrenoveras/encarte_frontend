import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '../../../services/api';

function Store({ match }) {
  const [store, setStore] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        const { url } = match.params;
        const response = await api.get(`store`, { params: { url } });
        setStore(response.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações');
      }
    }
    getData();
  }, []);
  return <div>{store.name}</div>;
}

export default Store;

Store.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
