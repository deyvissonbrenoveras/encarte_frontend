import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import useStyle from './styles';

export default function Stores() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { stores, loading } = useSelector((state) => state.store);
  useState(() => {
    dispatch(loadStoresRequest());
  }, []);
  return (
    <Grid container justify="center">
      <Grid xs={12} lg={6}>
        <Grid container>
          {stores &&
            stores.map((store) => (
              <Grid xs={6} lg={4} className={classes.grid}>
                <Link to={`loja/${store.url}`} className={classes.storeCard}>
                  <img
                    src={store.logo ? store.logo.url : ''}
                    alt={store.name}
                  />
                  <h3>{store.name}</h3>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
