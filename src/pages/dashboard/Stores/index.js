import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import { Container, StoreList } from './styles';

function Stores() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.stores);
  const loading = useSelector((state) => state.store.loading);
  useEffect(() => {
    async function getStores() {
      dispatch(loadStoresRequest());
    }
    getStores();
  }, []);
  return (
    <Container>
      <h2>Lojas</h2>
      <StoreList>
        {loading ? (
          <LoadingIcon />
        ) : (
          stores &&
          stores.map((store) => (
            <li key={store.id}>
              {store.logo && <img src={store.logo.url} alt={store.name} />}
              <Link to={`/updatestore/${store.id}`}>{store.name}</Link>
            </li>
          ))
        )}
      </StoreList>
    </Container>
  );
}
export default Stores;
