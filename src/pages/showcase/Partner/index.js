import React, { useEffect, useState } from 'react';
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
import {
  Link as LinkIcon,
  Facebook,
  Instagram,
  WhatsApp,
} from '@material-ui/icons';

import { loadRequest } from '../../../store/modules/showcase/actions';
import useStyles from './styles';
import NotFound from '../../../components/NotFound';

function Info({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = match.params;
  const partnerId = Number(match.params.partnerId);

  const [partner, setPartner] = useState({});
  const showcase = useSelector((state) => state.showcase.showcase);

  useEffect(() => {
    async function getPartner() {
      try {
        dispatch(loadRequest(url));
      } catch (error) {
        toast.error('Houve um erro ao carregar o parceiro');
      }
    }
    getPartner();
  }, []);
  useEffect(() => {
    if (showcase && showcase.partners) {
      const part = showcase.partners.filter((ptr) => ptr.id === partnerId)[0];
      setPartner(part);
      console.tron.log(part);
    }
  }, [showcase]);
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6} className={classes.grid}>
        {!partner ? (
          <NotFound />
        ) : (
          <>
            <Card>
              <CardActionArea className={classes.cardArea}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={partner.name}
                  image={partner.logo && partner.logo.url}
                  title={partner.name}
                />
              </CardActionArea>
              <CardContent className={classes.cardContent} />
            </Card>
            <h2 className={classes.partnerName}>{partner.name}</h2>
            {partner.site && (
              <>
                <h5>Site</h5>
                <div className={classes.site}>
                  <IconButton
                    type="button"
                    size="small"
                    onClick={() => {
                      window.open(partner.site);
                    }}
                  >
                    <LinkIcon />
                  </IconButton>
                  {partner.site}
                </div>
              </>
            )}
            {partner.regionalAgent && (
              <>
                <h5>Contato</h5>
                <div className={classes.contact}>
                  {partner.regionalAgent}, {partner.agentWhatsapp}.
                </div>
              </>
            )}
            {(partner.facebook ||
              partner.instagram ||
              partner.agentWhatsapp) && (
              <>
                <h5>Redes sociais</h5>
                <div className={classes.socialNetworks}>
                  {partner.facebook && (
                    <IconButton
                      onClick={() => {
                        window.open(`https://facebook.com/${partner.facebook}`);
                      }}
                    >
                      <Facebook style={{ fill: '#4267B2' }} fontSize="large" />
                    </IconButton>
                  )}
                  {partner.instagram && (
                    <IconButton
                      onClick={() => {
                        window.open(
                          `https://instagram.com/${partner.instagram}`
                        );
                      }}
                    >
                      <Instagram style={{ fill: '#C13584' }} fontSize="large" />
                    </IconButton>
                  )}
                  {partner.agentWhatsapp && (
                    <IconButton
                      onClick={() => {
                        window.open(
                          `https://api.whatsapp.com/send?phone=${partner.agentWhatsapp}`
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
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Info;

Info.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      partnerId: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
