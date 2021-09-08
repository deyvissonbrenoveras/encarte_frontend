/* eslint-disable guard-for-in */
import React, { useEffect, useMemo, useState } from 'react';
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
  CardContent,
  Typography,
  Avatar,
  ButtonBase,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import {
  Search,
  Facebook,
  Instagram,
  WhatsApp,
  AddShoppingCart,
} from '@material-ui/icons';
import slugify from '../../../util/slugify';
import NotFound from '../../../components/NotFound';
import LoadingIcon from '../../../components/LoadingIcon';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';
import history from '../../../services/history';

import useStyles from './styles';
import PriceTypeEnum from '../../../util/PriceTypeEnum';

import { addProduct } from '../../../store/modules/cart/actions';

function Store({ match }) {
  const { url } = match.params;
  const dispatch = useDispatch();
  const classes = useStyles();
  const notFound = useSelector((state) => state.showcase.notFound);
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
  }, [dispatch, url]);

  const store = useMemo(() => {
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
      categories.push({ id: null, name: 'Outros produtos' });
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

    return { ...showcase, products, categories, shelfLifeStart, shelfLifeEnd };
  }, [showcase]);

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
    const { shelfLifeStart, shelfLifeEnd, align } = params;
    if (!shelfLifeStart || !shelfLifeEnd) {
      return <></>;
    }
    return (
      <Typography
        className={classes.shelfLife}
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
          <IconButton
            onClick={() => {
              toast.success('O produto foi adicionado ao carrinho.');
              dispatch(addProduct(showcase.id, product, 1));
            }}
            className={classes.addCartButton}
          >
            <AddShoppingCart color="primary" />
          </IconButton>
        </div>
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
          <div className={classes.carouselProductPrice}>
            {product.formattedPrice}
          </div>
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
      <Grid container justify="center" className={classes.teste}>
        {notFound ? (
          <NotFound />
        ) : (
          <>
            <Grid item xs={12} md={8}>
              {store.partners &&
                store.partners.filter((partner) => !partner.sponsorship)
                  .length > 0 && (
                  <Typography component="h2" className={classes.subtitle}>
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
                          <div className={classes.overflow}>{partner.name}</div>
                        </ButtonBase>
                      </li>
                    ))}
              </ul>
              <ShelfLife
                align="right"
                shelfLifeStart={store.shelfLifeStart}
                shelfLifeEnd={store.shelfLifeEnd}
              />

              <CarouselComponent
                featuredProducts={
                  store.products &&
                  store.products.filter((product) => product.featured)
                }
              />

              {store.partners &&
                store.partners.filter((partner) => partner.sponsorship).length >
                  0 && (
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
                            <Typography
                              variant="h5"
                              className={classes.categoryName}
                            >
                              {category.name.toUpperCase()}
                            </Typography>
                            <Grid container>
                              {category.products.map((product) => (
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
                              ))}
                            </Grid>
                          </Grid>
                        )
                    )}
              </Grid>
              <footer className={classes.footer}>
                <Grid container>
                  <Grid item xs={12}>
                    <Card className={classes.cover}>
                      {store.cover && (
                        <CardActionArea
                          onClick={() => {
                            history.push(`/loja/${url}/info`);
                          }}
                        >
                          <CardMedia
                            className={classes.media}
                            component="img"
                            alt={store.name}
                            image={store.cover && store.cover.url}
                            title={store.name}
                          />
                        </CardActionArea>
                      )}
                      <CardContent>
                        {showcase.facebook && (
                          <IconButton
                            onClick={() => {
                              window.open(
                                `https://facebook.com/${showcase.facebook}`
                              );
                            }}
                          >
                            <Facebook
                              style={{ fill: '#4267B2' }}
                              fontSize="large"
                            />
                          </IconButton>
                        )}
                        {showcase.instagram && (
                          <IconButton
                            onClick={() => {
                              window.open(
                                `https://instagram.com/${showcase.instagram}`
                              );
                            }}
                          >
                            <Instagram
                              style={{ fill: '#C13584' }}
                              fontSize="large"
                            />
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
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} className={classes.footerInfo}>
                    <Typography variant="caption" display="block" gutterBottom>
                      IMAGENS MERAMENTE ILUSTRATIVAS**
                    </Typography>
                    <ShelfLife
                      align="center"
                      shelfLifeStart={store.shelfLifeStart}
                      shelfLifeEnd={store.shelfLifeEnd}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.footerInfo}>
                    {store.address && store.city && (
                      <>
                        <Typography
                          variant="overline"
                          display="block"
                          gutterBottom
                        >
                          Endereço: {store.address}
                        </Typography>
                        <Typography
                          variant="overline"
                          display="block"
                          gutterBottom
                        >
                          {store.city}.
                        </Typography>{' '}
                      </>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.footerInfo}>
                    {store.phone && (
                      <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                      >
                        Contato: {store.phone}
                      </Typography>
                    )}
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
