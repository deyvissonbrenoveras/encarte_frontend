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
import { loadCitiesActiveRequest } from '../../../store/modules/city/actions';

import useStyle from './styles';
import slugify from '../../../util/slugify';

import logo from '../../../assets/logo.webp';

export default function Stores() {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { stores, loading } = useSelector((state) => state.store);
  const stateCity = useSelector((state) => state.city);
  const [storesFoundBySearch, setStoresFoundBySearch] = useState(false);
  const [filterLocation, setFilterLocation] = useState('TODOS');
  const [filteredStores, setFilteredStores] = useState([]);

  useState(() => {
    dispatch(loadCitiesActiveRequest());
    dispatch(loadStoresRequest());
  }, []);

  function handleSearch(e) {
    if (e.target.value.length === 0) {
      setStoresFoundBySearch(false)
      if (filterLocation == 'TODOS') {
        setFilteredStores([])
      }
    } else {
      const storeSearch = slugify(e.target.value).toUpperCase();
      const strs = filterStores(filterLocation != 'TODOS' ? filteredStores : stores, storeSearch);
      setStoresFoundBySearch(true)
      if (strs.length) {
        setFilteredStores(strs);
      }
    }
  }

  const filterStores = (storesToFilter, storeSearch) => {
    return storesToFilter.filter((store) => {
      return (
        slugify(store.name).toUpperCase().includes(storeSearch) ||
        slugify(store.url).toUpperCase().includes(storeSearch)
      );
    });
  }

  const handleFilterStores = (value) => {
    if (value == '') {
      setFilterLocation('TODOS');
      setFilteredStores([])
    }
    var storesData = stores.filter((store) => store.cityId == value);

    setFilteredStores(storesData);
  };

  return loading ? (
    <LoadingIcon />
  ) : (
    <Grid container justifyContent="center" className={classes.container}>
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
                    onChange={(event) => {
                      setFilterLocation(event.target.value);
                      handleFilterStores(event.target.value);
                    }}
                  >
                    <MenuItem value="" hidden>
                      <em>Selecione a cidade</em>
                    </MenuItem>
                    <MenuItem value="TODOS">TODOS</MenuItem>
                    {stateCity.cities.map((item) => {
                      return (
                        <MenuItem key={item.cityId} value={item.cityId}>
                          {item.city.name} - {item.city.state.uf}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </Grid>
          <Typography className={classes.subtitle}>
            Estabelecimentos encontrados:
          </Typography>
          <Grid container spacing={2} className={classes.containerStores}>
            {(filteredStores.length)
              ? filteredStores.map((store) => (
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
