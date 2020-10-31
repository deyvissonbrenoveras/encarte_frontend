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
  makeStyles,
} from '@material-ui/core';
import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  name: { textAlign: 'center' },
  cover: {},
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 150,
  },
  media: {
    maxHeight: 150,
    objectFit: 'contain',
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(1),
  },
  partnerList: {
    padding: theme.spacing(1),
    overflow: 'scroll',
    width: '100%',
    display: 'flex',
    fontSize: 10,
    textAlign: 'center',
    '& li': {
      marginLeft: theme.spacing(1),
    },
  },
  overflow: {
    maxWidth: 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  featuredProductCard: {
    height: 150,
  },
  featuredProductImage: {
    maxWidth: 100,
    maxHeight: 100,
    objectFit: 'contain',
  },
}));
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
        <ul className={classes.partnerList}>
          {store.partners &&
            store.partners.map((partner) => (
              <li key={partner.id}>
                <Avatar
                  alt="Remy Sharp"
                  src={partner.logo ? partner.logo.url : ''}
                  className={classes.largeAvatar}
                />
                <div className={classes.overflow}>{partner.name}</div>
              </li>
            ))}
        </ul>
        <Grid container>
          {store.products &&
            store.products
              .filter((product) => product.featured)
              .map((product) => (
                <Grid item xs={4}>
                  <Card className={classes.featuredProductCard}>
                    <CardActionArea className={classes.cardArea}>
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
