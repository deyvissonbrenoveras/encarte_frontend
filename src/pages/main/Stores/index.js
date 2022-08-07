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
import api from '../../../services/api';
import useStyle from './styles';
import slugify from '../../../util/slugify';

import logo from '../../../assets/logo.webp';

export default function Stores() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const [stores, setStores] = useState(true);
  const [stateCity, setStateCity] = useState([]);
  const [storeCategory, setStoreCategory] = useState([]);
  const [search, setSearch] = useState('');

  const [filterLocation, setFilterLocation] = useState('TODOS');
  const [categoryInput, setCategoryInput] = useState('TODOS');
  const [filteredStores, setFilteredStores] = useState([]);
  const [cityId, setCityId] = useState('');

  useState(() => {
    Promise.all([
      api.get('/locations/active-cities'), 
      api.get('/stores'),
      api.get('/store-categories')
    ]).then(res => {
      const resolve = res[0].data.filter((item) => item.city != null);
      setStateCity(resolve);  

      setStores(res[1].data);
      setStoreCategory(res[2].data);
      setIsLoading(false);
    });
  }, []);

  function handleSearch(e) {
    if (e.target.value.length === 0) {
      handleFilterStores(cityId);
      if (filterLocation === 'TODOS') {
        setFilteredStores([]);
      }
    } else {
      const storeSearch = slugify(e.target.value).toUpperCase();
      const strs = filterStores(
        filterLocation !== 'TODOS' ? filteredStores : stores,
        storeSearch
      );
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
  };

  const handleFilterStores = (value) => {
    if (value === '') {
      setFilterLocation('TODOS');
      setFilteredStores([]);
    }
    var storesData = stores.filter((store) => store.cityId === value);
    setCityId(value);
    setFilteredStores(storesData);
  };

  const handleFilterStoresCategory = (value) => {
    console.log('id da categoria', value);
    if (value === '') {
      handleFilterStores(cityId);
    }
    console.log('filtrado?', filteredStores.length > 0)
    var storesData = (filteredStores.length > 0 ? filteredStores : stores)
    .filter((store) => store.storeCategoryId === value);
    setCityId(value);
    console.log('lojas filtradas', storesData);
    if(storesData.length) setFilteredStores(storesData);
  };

  const filterCity = (stores, city) => {
    var filtered = stores.filter(store => store.cityId == city);
    console.log('result filter city', filtered);
    return filtered.length > 0 ? filtered : stores
  }

  const filterCategory = (stores, category) => {
    console.log(stores, category);
    var filtered = stores.filter(store => store.storeCategoryId == category);
    console.log('result filter category', filtered);
    return filtered.length > 0 ? filtered : stores
  }

  const filterStoresSearch = (stores, search) => {
    var filtered =  stores.filter(store => store.name.toLowerCase().includes(search.toLowerCase()));
    return filtered.length > 0 ? filtered : stores
  }

  const handleFilter = (search = '', city = '', category = '') => {
    var filteredSearch = filterStoresSearch(stores, search);
    var filteredCity = filterCity(filteredSearch, city);
    var filteredCategory = filterCategory(filteredCity, category);

    setFilteredStores(filteredCategory);
  }

  return isLoading ? (
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
                // onChange={handleSearch}
                onChange={({ target }) => {
                  setSearch(target.value)
                  handleFilter(target.value, filterLocation, categoryInput);
                }}
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
                      handleFilter(search, event.target.value, categoryInput);
                      // handleFilterStores(event.target.value);
                    }}
                  >
                    <MenuItem value="" hidden>
                      <em>Selecione a cidade</em>
                    </MenuItem>
                    <MenuItem value="TODOS">TODOS</MenuItem>
                    {stateCity.map((item) => {
                      return (
                        <MenuItem key={item.cityId} value={item.cityId}>
                          {item.city.name} - {item.city.state.uf}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>

              <div className={classes.filterLocationInput}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1 }}
                  className={classes.selectInputLocation}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Filtrar por categoria <HiOutlineLocationMarker />
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={categoryInput}
                    variant="standard"
                    onChange={(event) => {
                      setCategoryInput(event.target.value);
                      handleFilter(search, filterLocation,event.target.value);
                      // handleFilterStoresCategory(event.target.value);
                    }}
                  >
                    <MenuItem value="" hidden>
                      <em>Selecione a categoria</em>
                    </MenuItem>
                    <MenuItem value="TODOS">TODOS</MenuItem>
                    {storeCategory.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
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
          <Grid spacing={1} container className={classes.containerStores}>
            {filteredStores.length
              ? filteredStores.map((store) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <StoreCard key={store.id} store={store} />
                  </Grid>
                ))
              : stores &&
                stores.map((store) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <StoreCard key={store.id} store={store} />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
