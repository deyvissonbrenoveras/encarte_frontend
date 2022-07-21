import React, { useState } from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { StoreCard } from './components/StoreCard';
//icons
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { Search } from '@material-ui/icons';
import LoadingIcon from '../../../components/LoadingIcon';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import { loadCitiesRequest } from '../../../store/modules/city/actions'

import useStyle from './styles';
import slugify from '../../../util/slugify';

import logo from '../../../assets/logo.webp';

export default function Stores() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { stores, loading } = useSelector((state) => state.store);
  const { cities } = useSelector((state) => state.city);
  const [storesFound, setStoresFound] = useState(null);
  const [filterLocation, setFilterLocation] = useState(null);

  useState(() => {
    dispatch(loadCitiesRequest());
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

  return loading ? (
    <LoadingIcon />
  ) : (
    <Grid container justify="center" className={classes.container}>
      <Grid item xs={12} lg={8} style={{ height: '100vh' }}>
        <Box className={classes.stickyTop} width="100%" textAlign="left">
          <img src={logo} alt="e-ncarte" className={classes.logo} />
        </Box>
        <Grid container>
          <Grid item xs={12} className={classes.search}>
            <div className={classes.ContainerButtons}>
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
              <div className={classes.filterLocationInput}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1 }}
                  className={classes.selectInputLocation}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Filtrar locais <HiOutlineLocationMarker />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={filterLocation}
                    variant="standard"
                    onChange={(event) => setFilterLocation(event.target.value)}
                  >
                    <MenuItem value="">
                      <em>Selecione a cidade</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </Grid>
          <Typography className={classes.subtitle}>
            Estabelecimentos encontrados:
          </Typography>
          <Grid container spacing={2} className={classes.containerStores}>
            {storesFound !== null
              ? storesFound.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))
              : stores &&
                stores.map((store) => (
                  <StoreCard key={store.id} store={store} />
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
