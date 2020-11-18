/* eslint-disable guard-for-in */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  ButtonBase,
  TextField,
  InputAdornment,
} from '@material-ui/core';

import { Search } from '@material-ui/icons';
import { formatPrice } from '../../../util/format';
import LoadingIcon from '../../../components/LoadingIcon';
import { loadRequest } from '../../../store/modules/showcase/actions';
import history from '../../../services/history';

import useStyles from './styles';

function Store({ match }) {
  const { url } = match.params;
  const dispatch = useDispatch();
  const classes = useStyles();

  const showcase = useSelector((state) => state.showcase.showcase);
  const loading = useSelector((state) => state.showcase.loading);
  const [productsFound, setProductsFound] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        dispatch(loadRequest(url));
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações');
      }
    }
    getData();
  }, []);

  const store = useMemo(() => {
    // Filter all categories
    let categories;
    let products;
    if (showcase.products) {
      products = showcase.products.map((pdt) => {
        return { ...pdt, formattedPrice: formatPrice(pdt.price) };
      });

      categories = products.reduce((cat, product) => {
        if (product.category) {
          let exists = false;
          for (let i = 0; i < cat.length; i += 1) {
            if (cat[i].id === product.category.id) {
              exists = true;
            }
          }
          if (!exists) {
            cat.push(product.category);
          }
        }
        return cat;
      }, []);
      categories.push({ id: null, name: 'Outros produtos' });
    }
    categories =
      categories &&
      categories.map((cat) => {
        const editingCategory = { ...cat };
        editingCategory.products = products.filter(
          (prod) => (prod.category ? prod.category.id : null) === cat.id
        );

        return editingCategory;
      });

    return { ...showcase, products, categories };
  }, [showcase]);

  function slugify(str) {
    const map = {
      '-': ' ',
      // eslint-disable-next-line no-dupe-keys
      '-': '_',
      a: 'á|à|ã|â|À|Á|Ã|Â',
      e: 'é|è|ê|É|È|Ê',
      i: 'í|ì|î|Í|Ì|Î',
      o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      c: 'ç|Ç',
      n: 'ñ|Ñ',
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }

    return str;
  }

  function handleSearch(e) {
    if (e.target.value.length === 0) {
      setProductsFound(null);
    } else {
      const productSearch = slugify(e.target.value).toUpperCase();
      const products = store.products.filter((product) => {
        return (
          slugify(product.name).toUpperCase().includes(productSearch) ||
          slugify(product.description).toUpperCase().includes(productSearch)
        );
      });
      setProductsFound(products);
    }
  }

  return (
    <Grid container justify="center">
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <Grid item xs={12} md={8}>
            <Card className={classes.cover}>
              <CardContent className={classes.name}>
                <Typography variant="h6" component="h2">
                  {store.name}
                </Typography>
              </CardContent>
              {store.cover && (
                <CardActionArea className={classes.cardArea}>
                  <CardMedia
                    className={classes.media}
                    component="img"
                    alt={store.name}
                    image={store.cover && store.cover.url}
                    title={store.name}
                  />
                </CardActionArea>
              )}
            </Card>
            <Typography
              variant="subtitle2"
              component="h2"
              className={classes.subtitle}
            >
              Parceiros
            </Typography>
            <ul className={classes.partnerList}>
              {store.partners &&
                store.partners
                  .filter((partner) => !partner.sponsorship)
                  .map((partner) => (
                    <li key={partner.id}>
                      <ButtonBase
                        key={partner.id}
                        onClick={() => {
                          history.push(
                            `/loja/${store.url}/parceiro/${partner.id}`
                          );
                        }}
                      >
                        <Avatar
                          alt={partner.name}
                          src={partner.logo ? partner.logo.url : ''}
                          className={classes.largeAvatar}
                        />
                        <div className={classes.overflow}>{partner.name}</div>
                      </ButtonBase>
                    </li>
                  ))}
            </ul>
            <Typography
              variant="subtitle2"
              component="h2"
              className={classes.subtitle}
            >
              Produtos em destaque
            </Typography>
            <Grid container justify="space-around">
              {store.products &&
                store.products
                  .filter((product) => product.featured)
                  .map((product) => (
                    <Grid
                      item
                      xs={4}
                      className={classes.productGrid}
                      key={product.id}
                    >
                      <Card
                        className={classes.featuredProductCard}
                        onClick={() => {
                          history.push(
                            `/loja/${store.url}/produto/${product.id}`
                          );
                        }}
                      >
                        <CardActionArea className={classes.productCardArea}>
                          <CardMedia
                            component="img"
                            className={classes.featuredProductImage}
                            alt={product.name}
                            image={product.image.url}
                            title={product.name}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
            <Typography
              variant="subtitle2"
              component="h2"
              className={classes.subtitle}
            >
              Patrocinadores
            </Typography>
            <ul className={classes.partnerList}>
              {store.partners &&
                store.partners
                  .filter((partner) => partner.sponsorship)
                  .map((partner) => (
                    <li key={partner.id}>
                      <ButtonBase
                        key={partner.id}
                        onClick={() => {
                          history.push(
                            `/loja/${store.url}/parceiro/${partner.id}`
                          );
                        }}
                      >
                        <Avatar
                          alt={partner.name}
                          src={partner.logo ? partner.logo.url : ''}
                          className={classes.largeAvatar}
                        />
                        <div className={classes.overflow}>{partner.name}</div>
                      </ButtonBase>
                    </li>
                  ))}
            </ul>
            <Grid container className={classes.productsContainer}>
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
              {productsFound !== null
                ? productsFound.map((product) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      className={classes.cardGrid}
                    >
                      <Card
                        onClick={() => {
                          history.push(
                            `/loja/${store.url}/produto/${product.id}`
                          );
                        }}
                      >
                        <CardActionArea className={classes.productCard}>
                          <CardMedia
                            className={classes.productImage}
                            component="img"
                            alt={product.name}
                            image={product.image && product.image.url}
                            title={product.name}
                          />

                          <div className={classes.productContent}>
                            <div>{product.name}</div>
                            <div className={classes.productPrice}>
                              {product.formattedPrice}
                            </div>
                          </div>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : store.categories &&
                  store.categories.map((category) => (
                    <>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          className={classes.categoryName}
                        >
                          {category.name.toUpperCase()}
                        </Typography>
                      </Grid>
                      {category.products.map((product) => (
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          className={classes.cardGrid}
                        >
                          <Card
                            onClick={() => {
                              history.push(
                                `/loja/${store.url}/produto/${product.id}`
                              );
                            }}
                          >
                            <CardActionArea className={classes.productCard}>
                              <CardMedia
                                className={classes.productImage}
                                component="img"
                                alt={product.name}
                                image={product.image && product.image.url}
                                title={product.name}
                              />

                              <div className={classes.productContent}>
                                <div>{product.name}</div>
                                <div className={classes.productPrice}>
                                  {product.formattedPrice}
                                </div>
                              </div>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </>
                  ))}
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Store;

Store.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
