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
import { StoreCard } from './components/StoreCard';
//icons
import { HiOutlineLocationMarker } from 'react-icons/hi';

import { Search } from '@material-ui/icons';
import LoadingIcon from '../../../components/LoadingIcon';
import api from '../../../services/api';
import useStyle from './styles';
import slugify from '../../../util/slugify';

import logo from '../../../assets/logo.webp';

export default function Stores() {
  const classes = useStyle();
  const [isLoading, setIsLoading] = useState(true);

  const [stores, setStores] = useState(true);
  const [stateCity, setStateCity] = useState([]);
  const [storeCategory, setStoreCategory] = useState([]);

  const [hasError, setHasError] = useState('');
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
    if(e.target.value.length === 0 && categoryInput !== 'TODOS' && filterLocation !== 'TODOS') {
      handleFilterStoresByCity(filterLocation)
    } else if (e.target.value.length === 0 && categoryInput !== 'TODOS') {
      handleFilterStoresByCategory(categoryInput)
    } else if (e.target.value.length === 0 && filterLocation !== 'TODOS') {
      handleFilterStoresByCity(filterLocation)
    } else if (e.target.value.length === 0) {
      handleFilterStoresByCity(cityId);
      if (filterLocation === 'TODOS') {
        setFilteredStores([]);
      }
    } else {
      const storeSearch = slugify(e.target.value).toUpperCase();
      const strs = filterStores(
        filteredStores.length ? filteredStores : stores,
        storeSearch
      );
      if (strs.length) {
        setFilteredStores(strs);
      } else {
        setHasError('Nenhuma loja encontrada pela pesquisa informada.')
      }
    }
  }

  const filterStores = (storesToFilter, storeSearch) => {
    return storesToFilter.filter((store) => {
      return (
        slugify(store.name).toUpperCase().includes(storeSearch) || slugify(store.url).toUpperCase().includes(storeSearch)
      );
    });
  };
  
  // filtrar lojas por categoria independente da cidade
  const filterStoresByCategoryRegardlessOfCity = (categoryId) => {
    var filtered = stores.filter(store => store.storeCategoryId === categoryId);
    setFilteredStores(filtered)
  }

  const handleFilterStoresByCity = (value) => {
    if(value === 'TODOS' && categoryInput !== 'TODOS') {
      filterStoresByCategoryRegardlessOfCity(categoryInput)
      return
    } else if (value === '' || value === 'TODOS') {
      setFilterLocation('TODOS');
      setFilteredStores([]);
    }
    
    // eslint-disable-next-line
    var storesData = stores.filter(store => {
      if((categoryInput !== 'TODOS') && (store.storeCategoryId === categoryInput) && (store.cityId === value)) {
        return store
      } else if(categoryInput === 'TODOS' && store.cityId === value) {
        return store
      }
    });
    setCityId(value);
    if(storesData.length > 0) {
      setFilteredStores(storesData);
      setHasError('')
    } else {
      setHasError('Nenhuma loja encontrada') 
    }
  };

  const handleFilterStoresByCategory = (value) => {
    if(value === 'TODOS' && filterLocation !== 'TODOS') {
      handleFilterStoresByCity(filterLocation)
      return
    } 
    

    var hasCityToFilter = filterLocation !== 'TODOS' ? (stores.filter(store => store.cityId === filterLocation)).length > 0 : false
    var storesData = (filteredStores.length > 0 && !hasCityToFilter && filterLocation !== 'TODOS' ? filteredStores : stores)
    // eslint-disable-next-line
    .filter((store) => {
      if(filterLocation !== 'TODOS' ? store.cityId === filterLocation && store.storeCategoryId === value 
      : store.storeCategoryId === value) {
        return store
      } 
      else if (filterLocation === 'TODOS' && store.storeCategoryId === value){
        return store
      } 
      else if (store.storeCategoryId === value){
        return store
      }
    });
    setCityId(value);
    
    if(storesData.length > 0) {
      setHasError('')
      setFilteredStores(storesData)
    } else {
      setHasError('Nenhuma loja encontrada') 
    }
  };

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
                      handleFilterStoresByCity(event.target.value);
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
                      // handleFilter(search, filterLocation,event.target.value);
                      handleFilterStoresByCategory(event.target.value);
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
          {hasError !== '' && <Typography className={classes.subtitle}>
            {hasError}
          </Typography>}
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
