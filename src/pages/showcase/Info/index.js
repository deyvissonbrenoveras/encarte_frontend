import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import { Facebook, Instagram, WhatsApp } from '@material-ui/icons';
import { loadRequest } from '../../../store/modules/showcase/actions';
import useStyles from './styles';
// import { Container } from './styles';

function Info({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = match.params;

  const showcase = useSelector((state) => state.showcase.showcase);

  useEffect(() => {
    async function getStore() {
      try {
        dispatch(loadRequest(url));
      } catch (error) {
        toast.error('Houve um erro ao carregar as informações da loja');
      }
    }
    getStore();
  }, []);
  return (
    <Grid container justify="center">
      {/* {loading ? (
        <LoadingIcon />
      ) : (
        <> */}
      <Grid item xs={12} sm={10} md={8} lg={6} className={classes.grid}>
        <Card>
          <CardActionArea className={classes.cardArea}>
            <CardMedia
              className={classes.media}
              component="img"
              alt={showcase.name}
              image={showcase.logo && showcase.logo.url}
              title={showcase.name}
            />
          </CardActionArea>
          <CardContent className={classes.cardContent} />
        </Card>
        <h2 className={classes.showcaseName}>{showcase.name}</h2>
        {(showcase.facebook || showcase.instagram || showcase.whatsapp) && (
          <>
            <h5>Redes sociais</h5>
            <div className={classes.socialNetworks}>
              {showcase.facebook && (
                <IconButton
                  onClick={() => {
                    window.open(`https://facebook.com/${showcase.facebook}`);
                  }}
                >
                  <Facebook style={{ fill: '#4267B2' }} fontSize="medium" />
                </IconButton>
              )}
              {showcase.instagram && (
                <IconButton
                  onClick={() => {
                    window.open(`https://instagram.com/${showcase.instagram}`);
                  }}
                >
                  <Instagram style={{ fill: '#C13584' }} fontSize="medium" />
                </IconButton>
              )}
              {showcase.whatsapp && (
                <IconButton
                  onClick={() => {
                    window.open(
                      `https://api.whatsapp.com/send?phone=${showcase.whatsapp}`
                    );
                  }}
                >
                  <WhatsApp
                    style={{
                      fill: 'white',
                      backgroundColor: '#128C7E',
                      borderRadius: 10,
                    }}
                    fontSize="medium"
                  />
                </IconButton>
              )}
            </div>
          </>
        )}
        <h5>Endereço</h5>
        <div className={classes.address}>
          {showcase.address}
          {showcase.city}
        </div>
      </Grid>
      {/* </>
      )} */}
    </Grid>
  );
}

export default Info;

Info.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
