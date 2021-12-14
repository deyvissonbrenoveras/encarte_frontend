/* eslint-disable guard-for-in */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MetaTags } from 'react-meta-tags';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import Carousel from 'react-material-ui-carousel';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Avatar,
  ButtonBase,
  Button,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import logo from '../../../assets/logo.webp';
import slugify from '../../../util/slugify';
import NotFound from '../../../components/NotFound';
import LoadingIcon from '../../../components/LoadingIcon';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';
import history from '../../../services/history';

import useStyles from './styles';
import PriceTypeEnum from '../../../util/PriceTypeEnum';

import { addProduct } from '../../../store/modules/cart/actions';
import SocialNetworks from '../../../components/SocialNetworks';
import { css } from 'styled-components';

function Store({ match }) {
  const { url } = match.params;
  const dispatch = useDispatch();
  const YEAR = new Date().getFullYear();
  const notFound = useSelector((state) => state.showcase.notFound);
  const showcase = useSelector((state) => state.showcase.showcase);
  const loading = useSelector((state) => state.showcase.loading);
  const search = useSelector((state) => state.search.search);
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
  } = showcase;
  const classes = useStyles({
    primaryColor,
    secondaryColor,
    tertiaryColor,
    quaternaryColor,
  });

  const [store, setStore] = useState({});
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
  }, [dispatch, url]);

  useEffect(() => {
    // Filter all categories
    let categories;
    let products;
    if (showcase.products) {
      products = showcase.products.map((pdt) => {
        return { ...pdt, formattedPrice: formatPrice(pdt.price) };
      });

      categories = products
        .reduce((cat, product) => {
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
        }, [])
        .sort((a, b) => a.name.localeCompare(b.name));
      categories.push({ id: 0, name: 'Outros produtos' });
    }
    categories =
      categories &&
      categories.map((cat) => {
        const editingCategory = { ...cat };
        editingCategory.products = products
          .filter(
            (prod) => (prod.category ? prod.category.id : null) === cat.id
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        return editingCategory;
      });

    // shelfLifeEnd formatting
    const shelfLifeStart = showcase.shelfLifeStart
      ? format(parseISO(showcase.shelfLifeStart.split('T')[0]), 'dd/MM/yyyy')
      : null;

    const shelfLifeEnd = showcase.shelfLifeEnd
      ? format(parseISO(showcase.shelfLifeEnd.split('T')[0]), 'dd/MM/yyyy')
      : null;

    setStore({
      ...showcase,
      products,
      categories,
      shelfLifeStart,
      shelfLifeEnd,
    });
  }, [showcase]);
  useEffect(() => {
    if (store.products) {
      if (search && search.length === 0) {
        setProductsFound(null);
      } else {
        const productSearch = slugify(search).toUpperCase();
        const products = store.products.filter((product) => {
          return (
            slugify(product.name).toUpperCase().includes(productSearch) ||
            slugify(product.description).toUpperCase().includes(productSearch)
          );
        });
        setProductsFound(products);
      }
    }
  }, [search]);

  function ProductItemPrice(params) {
    const { product } = params;

    switch (product.priceType) {
      case PriceTypeEnum.DEFAULT:
        return (
          <div className={classes.productPrice}>{product.formattedPrice}</div>
        );
      case PriceTypeEnum.SPECIAL_OFFER:
        return (
          <div className={classes.specialOfferProductPrice}>
            OFERTA ESPECIAL
          </div>
        );
      case PriceTypeEnum.FEATURED:
        return (
          <div className={classes.featuredPrice}>{product.formattedPrice}</div>
        );
      default:
        return (
          <div className={classes.productPrice}>{product.formattedPrice}</div>
        );
    }
  }
  function ShelfLife(params) {
    const { shelfLifeStart, shelfLifeEnd, align, color } = params;
    if (!shelfLifeStart || !shelfLifeEnd) {
      return <></>;
    }
    return (
      <Typography
        className={classes.shelfLife}
        color={color}
        align={align}
        variant="caption"
        display="block"
        gutterBottom
      >
        {`PREÇOS VÁLIDOS DE ${shelfLifeStart} ATÉ ${shelfLifeEnd}.`}
      </Typography>
    );
  }
  function productClick(product) {
    history.push(`/loja/${store.url}/produto/${product.id}`);
  }
  function ProductItem(params) {
    const { product } = params;

    return (
      <CardActionArea className={classes.productCard}>
        <CardMedia
          className={classes.productImage}
          component="img"
          alt={product.name}
          image={product.image && product.image.url}
          title={product.name}
          onClick={() => {
            productClick(product);
          }}
        />

        <div className={classes.productContent}>
          <a href={`/loja/${store.url}/produto/${product.id}`}>
            {product.name}
          </a>
          <ProductItemPrice product={product} />
          {/* <IconButton
            onClick={() => {
              toast.success('O produto foi adicionado ao carrinho.');
              dispatch(addProduct(showcase.id, product, 1));
            }}
            className={classes.addCartButton}
          >
            <AddShoppingCart color="primary" />
          </IconButton> */}
        </div>
        <Button
          variant="contained"
          color="#000"
          size="small"
          onClick={() => {
            toast.success('O produto foi adicionado ao carrinho.');
            dispatch(addProduct(showcase.id, product, 1));
          }}
          startIcon={<AddShoppingCart />}
          className={classes.buyProductButton}
        >
          Carrinho
        </Button>
      </CardActionArea>
    );
  }

  function CarouselProduct({ product }) {
    return (
      <div
        onClick={() => {
          productClick(product);
        }}
        className={classes.carouselProduct}
      >
        <img src={product.image.url} alt={product.name} />
        <div className={classes.carouselProductInfo}>
          <div className={classes.carouselProductName}>{product.name}</div>
          {product.priceType == PriceTypeEnum.SPECIAL_OFFER ? (
            <div className={classes.carouselspecialOfferProductPrice}>
              OFERTA ESPECIAL
            </div>
          ) : (
            <div className={classes.carouselProductPrice}>
              {product.formattedPrice}
            </div>
          )}
        </div>
      </div>
    );
  }

  function CarouselComponent({ featuredProducts }) {
    let carouselItems = [];
    store.cover &&
      carouselItems.push(
        <div className={classes.carouselAdvertisementItem}>
          <img
            className={classes.carouselAdvertisementImg}
            src={store.cover ? store.cover.url : ''}
            alt="cover"
          />
        </div>
      );
    let productsItems = [];
    if (featuredProducts) {
      for (let i = 0; i < featuredProducts.length; i += 2) {
        productsItems.push(
          featuredProducts.length - i === 1 ? (
            <div className={classes.carouselItem}>
              <CarouselProduct product={featuredProducts[i]} />
            </div>
          ) : (
            <div className={classes.carouselItem}>
              <CarouselProduct product={featuredProducts[i]} />
              <CarouselProduct product={featuredProducts[i + 1]} />
            </div>
          )
        );
      }
    }
    carouselItems = [...carouselItems, ...productsItems];

    store.secondaryCover &&
      carouselItems.push(
        <div className={classes.carouselAdvertisementItem}>
          <img
            className={classes.carouselAdvertisementImg}
            src={store.secondaryCover ? store.secondaryCover.url : ''}
            alt="secondary cover"
          />
        </div>
      );
    return (
      <Carousel
        className={classes.carousel}
        interval={3000} /*autoPlay={false}*/
      >
        {carouselItems && carouselItems}
      </Carousel>
    );
  }
  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      <MetaTags>
        <title>e-ncarte {store.name}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`e-ncarte ${store.name}`} />
        <meta
          property="og:description"
          content={`Veja o Encarte Digital da(o) ${store.name}`}
        />
        {store.logo && <meta property="og:image" content={store.logo.url} />}
      </MetaTags>
      <Grid container justify="center">
        {notFound ? (
          <NotFound />
        ) : (
          <>
            <Grid item xs={12}>
              <h1 className={classes.showcaseName}>{showcase.name}</h1>
            </Grid>
            <Grid item xs={12} /*md={8}*/>
              <Grid
                container
                justify="center"
                className={classes.partnerContainer}
              >
                <Grid item xs={12} sm={8}>
                  {store.partners &&
                    store.partners.filter((partner) => !partner.sponsorship)
                      .length > 0 && (
                      <Typography
                        component="h2"
                        className={classes.partnersTitle}
                      >
                        Parceiros
                      </Typography>
                    )}
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
                                className={classes.partnerAvatar}
                              />
                              <div className={classes.overflow}>
                                {partner.name}
                              </div>
                            </ButtonBase>
                          </li>
                        ))}
                  </ul>
                </Grid>
              </Grid>
              {!search && (
                <Grid container justify="center">
                  <Grid item xs={12} md={8}>
                    <CarouselComponent
                      featuredProducts={
                        store.products &&
                        store.products.filter((product) => product.featured)
                      }
                    />
                  </Grid>
                </Grid>
              )}
              <Grid container justify="center">
                <Grid item xs={12} sm={10} lg={8}>
                  {store.partners &&
                    store.partners.filter((partner) => partner.sponsorship)
                      .length > 0 && (
                      <Typography component="h2" className={classes.subtitle}>
                        Patrocinadores
                      </Typography>
                    )}

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
                                className={classes.sponsorshipAvatar}
                              />
                              <div className={classes.overflow}>
                                {partner.name}
                              </div>
                            </ButtonBase>
                          </li>
                        ))}
                  </ul>
                  <ShelfLife
                    align="center"
                    shelfLifeStart={store.shelfLifeStart}
                    shelfLifeEnd={store.shelfLifeEnd}
                    color={tertiaryColor}
                  />
                  <Grid container className={classes.productsContainer}>
                    {productsFound !== null
                      ? productsFound.map((product) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            className={classes.cardGrid}
                            key={product.id}
                          >
                            <Card>
                              <ProductItem product={product} />
                            </Card>
                          </Grid>
                        ))
                      : store.categories &&
                        store.categories.map(
                          (category) =>
                            category.products &&
                            category.products.length > 0 && (
                              <Grid item xs={12} key={category.id}>
                                <Grid
                                  container
                                  className={classes.categoryContainer}
                                >
                                  <Grid item m xs={12} md={6}>
                                    <Typography
                                      variant="h5"
                                      className={classes.categoryName}
                                    >
                                      {category.name.toUpperCase()}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  {category.products.map((product) => (
                                    <Grid
                                      item
                                      xs={12}
                                      sm={6}
                                      md={4}
                                      lg={3}
                                      className={classes.cardGrid}
                                      key={product.id}
                                    >
                                      <Card>
                                        <ProductItem product={product} />
                                      </Card>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Grid>
                            )
                        )}
                  </Grid>
                </Grid>
              </Grid>
              <footer className={classes.footer}>
                <Grid
                  container
                  justify="center"
                  className={classes.showcaseFooter}
                >
                  <Grid item xs={12} className={classes.footerStoreContainer}>
                    <div className={classes.footerStoreCard}>
                      {store.cover && (
                        <div
                          onClick={() => {
                            history.push(`/loja/${url}/info`);
                          }}
                          className={classes.footerCardAction}
                        >
                          <img
                            className={classes.footerMedia}
                            alt={store.name}
                            src={store.cover && store.cover.url}
                          />
                        </div>
                      )}
                      <SocialNetworks
                        facebook={showcase.facebook}
                        instagram={showcase.instagram}
                        whatsapp={showcase.whatsapp}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} className={classes.footerInfo}>
                    <div>IMAGENS MERAMENTE ILUSTRATIVAS**</div>
                    <ShelfLife
                      align="center"
                      shelfLifeStart={store.shelfLifeStart}
                      shelfLifeEnd={store.shelfLifeEnd}
                      color="#2e2e2e"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.footerInfo}>
                    {store.address && store.city && (
                      <>
                        <div>Endereço: {store.address}</div>
                        <div>{store.city}.</div>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.footerInfo}>
                    {store.phone && <div>Contato: {store.phone}</div>}
                  </Grid>
                </Grid>
                <Grid container justify="center">
                  <Grid item xs={12} className={classes.encarteFooter}>
                    <div>Página desenvolvida por:</div>
                    <img
                      src={logo}
                      alt="e-ncarte logo"
                      className={classes.encarteFooterLogo}
                    />
                    <SocialNetworks
                      facebook="agenciaencarte"
                      instagram="e_ncarte"
                      whatsapp="558393609556"
                    />
                    <div>© {YEAR} e-ncarte publicidade digital</div>
                    <div></div>
                  </Grid>
                </Grid>
              </footer>
            </Grid>
          </>
        )}
      </Grid>
    </>
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
