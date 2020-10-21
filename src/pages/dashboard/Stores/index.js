import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Typography,
} from '@material-ui/core';
// import TableTest from './TableTest';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import { Container } from './styles';

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
      <Typography align="center" variant="h5">
        Lojas
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LoadingIcon />
            ) : (
              stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>
                    <Avatar src={store.logo.url} alt={store.name} />
                  </TableCell>
                  <TableCell>
                    <Link to={`/updatestore/${store.id}`}>{store.name}</Link>
                  </TableCell>
                  <TableCell>{store.url}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {/* <TableTest label="Lojas" /> */}
      </TableContainer>
    </Container>
  );
}
export default Stores;
