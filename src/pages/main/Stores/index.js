import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Search } from '@material-ui/icons';
import LoadingIcon from '../../../components/LoadingIcon';
import { loadStoresRequest } from '../../../store/modules/store/actions';

import useStyle from './styles';
import slugify from '../../../util/slugify';

import logo from '../../../assets/logo.webp';

export default function Stores() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { stores, loading } = useSelector((state) => state.store);
  const [storesFound, setStoresFound] = useState(null);

  useState(() => {
    dispatch(loadStoresRequest());
  }, []);
  function handleSearch(e) {
    if (e.target.value.length === 0) {
      setStoresFound(null);
    } else {
      const storeSearch = slugify(e.target.value).toUpperCase();
      const strs = stores.filter((store) => {
        return (
          slugify(store.name).toUpperCase().includes(storeSearch) ||
          slugify(store.url).toUpperCase().includes(storeSearch)
        );
      });
      setStoresFound(strs);
    }
  }
  function StoreCard({ store }) {
    return (
      <Grid item xs={6} lg={4} className={classes.grid}>
        <Link to={`loja/${store.url}`} className={classes.storeCard}>
          <img src={store.logo ? store.logo.url : ''} alt={store.name} />
          <h3>{store.name}</h3>
        </Link>
      </Grid>
    );
  }
  StoreCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    store: PropTypes.object.isRequired,
  };
  return loading ? (
    <LoadingIcon />
  ) : (
    <Grid container justify="center">
      <Grid item xs={12} lg={6}>
        <Box className={classes.stickyTop} width="100%" textAlign="center">
          <img src={logo} alt="e-ncarte" className={classes.logo} />
        </Box>
        <Typography component="h2" className={classes.subtitle}>
          Selecione uma loja
        </Typography>
        <Grid container>
          <Grid item xs={12} className={classes.search}>
            <TextField
              onChange={handleSearch}
              className={classes.searchInput}
              label="Buscar"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {storesFound !== null
            ? storesFound.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))
            : stores &&
              stores.map((store) => <StoreCard key={store.id} store={store} />)}
        </Grid>
      </Grid>
    </Grid>
  );
}
