import React, { useEffect, useMemo } from 'react';
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
} from '@material-ui/core';

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
    if (showcase.products) {
      categories = showcase.products.reduce((cat, product) => {
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
        editingCategory.products = showcase.products.filter(
          (prod) => (prod.category ? prod.category.id : null) === cat.id
        );
        return editingCategory;
      });
    console.tron.log(categories);
    return { ...showcase, categories };
  }, [showcase]);

  return (
    <Grid container justify="center">
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <Grid item xs={12} sm={10} md={8}>
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
            <Grid container>
              {store.categories &&
                store.categories.map((category) => (
                  <>
                    <Grid Item xs={12}>
                      <Typography variant="h5" className={classes.categoryName}>
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
                        <Card className={classes.productCard}>
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
                              {product.price}
                            </div>
                          </div>
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
