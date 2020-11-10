import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import api from '../../../services/api';

import history from '../../../services/history';

import useStyles from './styles';

function Store({ match }) {
  const classes = useStyles();
  const [store, setStore] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        const { url } = match.params;
        const response = await api.get(`store`, { params: { url } });
        console.tron.log(response.data);
        setStore(response.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações');
      }
    }
    getData();
  }, []);
  return (
    <Grid container justify="center">
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
                      history.push(`/loja/${store.url}/parceiro/${partner.id}`);
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
                      history.push(`/loja/${store.url}/produto/${product.id}`);
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
                  <Avatar
                    alt={partner.name}
                    src={partner.logo ? partner.logo.url : ''}
                    className={classes.largeAvatar}
                  />
                  <div className={classes.overflow}>{partner.name}</div>
                </li>
              ))}
        </ul>
      </Grid>
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
