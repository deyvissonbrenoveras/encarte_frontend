import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton } from '@material-ui/core';
import { Facebook, Instagram, WhatsApp } from '@material-ui/icons';
import { loadRequest } from '../../../store/modules/showcase/actions';
import useStyles from './styles';

function Info({ match }) {
  const dispatch = useDispatch();
  const { url } = match.params;

  const showcase = useSelector((state) => state.showcase.showcase);
  const { primaryColor, secondaryColor, tertiaryColor } = showcase;
  const classes = useStyles({ primaryColor, secondaryColor, tertiaryColor });

  useEffect(() => {
    async function getStore() {
      try {
        dispatch(loadRequest(url));
      } catch (error) {
        toast.error('Houve um erro ao carregar as informações da loja');
      }
    }
    getStore();
  }, [dispatch, url]);
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <div className={classes.backgroundLogoContainer}>
          <div className={classes.logoContainer}>
            <img
              className={classes.media}
              alt={showcase.name}
              src={showcase.logo && showcase.logo.url}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6} className={classes.grid}>
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
                  <Facebook style={{ fill: '#4267B2' }} fontSize="large" />
                </IconButton>
              )}
              {showcase.instagram && (
                <IconButton
                  onClick={() => {
                    window.open(`https://instagram.com/${showcase.instagram}`);
                  }}
                >
                  <Instagram style={{ fill: '#C13584' }} fontSize="large" />
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
                    fontSize="large"
                  />
                </IconButton>
              )}
            </div>
          </>
        )}
        <h5>Endereço</h5>
        <div className={classes.address}>
          {`${showcase.address}, ${showcase.city}.`}
        </div>
      </Grid>
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
