import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  IconButton,
  Modal,
  Avatar,
  ButtonBase,
  Box,
} from '@material-ui/core';
import {
  Link as LinkIcon,
  Facebook,
  Instagram,
  WhatsApp,
  Close,
} from '@material-ui/icons';

import history from '../../../services/history';

import { loadRequest } from '../../../store/modules/showcase/actions';
import useStyles from './styles';
import NotFound from '../../../components/NotFound';

function Info({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { url } = match.params;
  const partnerId = Number(match.params.partnerId);

  const [partner, setPartner] = useState({});
  const [productModal, setProductModal] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);
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
  }, [dispatch, url]);
  useEffect(() => {
    if (showcase && showcase.partners) {
      const part = showcase.partners.filter((ptr) => ptr.id === partnerId)[0];
      setPartner(part);
    }
  }, [showcase, partnerId]);
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
                <div className={classes.contact}>{partner.regionalAgent}</div>
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
            {partner.products && (
              <>
                <Typography component="h2" className={classes.subtitle}>
                  Catálogo de produtos
                </Typography>
                <Grid container justify="space-around">
                  {partner.products.map((product) => (
                    <Grid
                      item
                      xs={4}
                      className={classes.productGrid}
                      key={product.id}
                    >
                      <Card
                        className={classes.featuredProductCard}
                        onClick={() => {
                          setProductModal(product);
                          setModalOpen(true);
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
                {productModal && (
                  <Modal
                    open={modalOpen}
                    onClose={() => {
                      setModalOpen(false);
                    }}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.productModal}
                  >
                    <div className={classes.productModalContent}>
                      <Box
                        width="100%"
                        textAlign="right"
                        className={classes.stickyTop}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setModalOpen(false);
                          }}
                          className={classes.buttonCloseModal}
                        >
                          <Close />
                        </button>
                      </Box>
                      <Grid
                        container
                        // style={{ height: '100%', border: '1px solid red' }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={
                            productModal.stores &&
                            productModal.stores.length > 0
                              ? 6
                              : 12
                          }
                          className={classes.productModalGrid}
                        >
                          <div className={classes.productModalImageContainer}>
                            <img
                              className={classes.productModalImage}
                              alt={productModal.name}
                              src={productModal.image.url || ''}
                            />
                          </div>

                          <h2 className={classes.productModalName}>
                            {productModal.name}
                          </h2>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          {productModal.stores &&
                            productModal.stores.length > 0 && (
                              <Typography
                                component="h2"
                                className={classes.productModalStoreSubtitle}
                              >
                                Encontre este e outros produtos em:
                              </Typography>
                            )}
                          <Grid container>
                            {productModal.stores &&
                              productModal.stores.map((store) => (
                                <Grid
                                  item
                                  className={classes.productModalStore}
                                  key={store.id}
                                  xs={6}
                                  md={4}
                                  lg={3}
                                >
                                  <ButtonBase
                                    key={partner.id}
                                    onClick={() => {
                                      history.push(
                                        `/loja/${store.url}/produto/${productModal.id}`
                                      );
                                    }}
                                    className={classes.productModalStoreButton}
                                  >
                                    <Avatar
                                      alt={store.name}
                                      src={store.logo.url || ''}
                                      className={classes.productModalStoreImage}
                                    />

                                    <div className={classes.overflow}>
                                      {store.name}
                                    </div>
                                  </ButtonBase>
                                </Grid>
                              ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Modal>
                )}
              </>
            )}
            {partner.customizableField && (
              <div
                className={classes.customizableField}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: partner.customizableField }}
              />
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
