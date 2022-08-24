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

import { Add, Remove, AddShoppingCart } from '@material-ui/icons';
import NotFound from '../../../components/NotFound';
import PriceTypeEnum from '../../../util/PriceTypeEnum';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';
import { addProduct } from '../../../store/modules/cart/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import useStyles from './styles';

import {
  getQuantityToAdd,
  getQuantityToRemove,
} from '../../../helpers/productQuantityCalculationHelper';

function Product({ match }) {
  const dispatch = useDispatch();
  const { url } = match.params;
  const productId = Number(match.params.productId);
  const [product, setProduct] = useState(null);
  const { showcase, loading } = useSelector((state) => state.showcase);
  const { primaryColor, secondaryColor, tertiaryColor } = showcase;
  const classes = useStyles({ primaryColor, secondaryColor, tertiaryColor });
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    if (showcase && showcase.products) {
      const prod = showcase.products
        .filter((pdt) => pdt.id === productId)
        .map((pdt) => {
          const formattedPrice = formatPrice(
            pdt.Products_Stores.customPrice || pdt.price
          );
          return { ...pdt, formattedPrice };
        })[0];
      setProduct(prod);
      setAmount(1);
    }
  }, [showcase, productId]);
  function ProductItemPrice(params) {
    const { product: prod } = params;

    switch (prod.priceType) {
      case PriceTypeEnum.DEFAULT:
        return (
          <div className={classes.productDefaultPrice}>
            {prod.formattedPrice}
          </div>
        );
      case PriceTypeEnum.SPECIAL_OFFER:
        return (
          <div className={classes.specialOfferProductPrice}>
            OFERTA ESPECIAL
          </div>
        );
      case PriceTypeEnum.FEATURED:
        return (
          <div className={classes.featuredPrice}>{prod.formattedPrice}</div>
        );
      default:
        return (
          <div className={classes.productPrice}>{prod.formattedPrice}</div>
        );
    }
  }
  useEffect(() => {
    async function getProduct() {
      try {
        dispatch(loadRequest(url));
      } catch (error) {
        toast.error('Houve um erro ao carregar o produto');
      }
    }
    getProduct();
  }, [dispatch, url]);
  function handleAddProduct() {
    dispatch(addProduct(showcase.id, product, amount));
    history.push(`/loja/${url}/carrinho`);
  }
  async function decreaseAmount() {
    const minimumValue = product.fractionedQuantity ? 0.1 : 1;
    if (amount > minimumValue) {
      const newAmount = getQuantityToRemove(product.fractionedQuantity, amount);
      await setAmount(newAmount);
    }
  }
  async function increaseAmount() {
    const newAmount = getQuantityToAdd(product.fractionedQuantity, amount);
    await setAmount(newAmount);
  }
  async function amountFocusOut(e) {
    if (e.target.value < 1 || e.target.value > 500) {
      await setAmount(1);
    }
  }
  useEffect(() => {
    if (product) {
      const price = product.Products_Stores.customPrice || product.price;
      setTotal(formatPrice(amount * price));
    }
  }, [amount, product]);
  return loading ? (
    <LoadingIcon />
  ) : (
    <Grid container justify="center">
      {!product ? (
        <NotFound />
      ) : (
        <>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card>
              <CardActionArea className={classes.cardArea}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={product.name}
                  image={product.image && product.image.url}
                  title={product.name}
                />
              </CardActionArea>
              <CardContent className={classes.cardContent}>
                <div className={classes.productName}>{product.name}</div>
                <div className={classes.productPrice}>
                  <div>Preço:</div>
                  <ProductItemPrice product={product} />
                </div>

                <div className={classes.productDescription}>
                  {product.description}
                </div>
              </CardContent>
            </Card>
            <div className={classes.addProduct}>
              <div>
                <IconButton onClick={decreaseAmount}>
                  <Remove />
                </IconButton>
                <input
                  type="number"
                  className={classes.productAmount}
                  value={amount}
                  readOnly
                  min={1}
                  max={500}
                  onBlur={amountFocusOut}
                />
                <IconButton onClick={increaseAmount}>
                  <Add />
                </IconButton>
              </div>
              <div>
                {product.priceType !== PriceTypeEnum.SPECIAL_OFFER &&
                  (total || product.formattedPrice)}
              </div>
              <IconButton onClick={handleAddProduct}>
                <AddShoppingCart />
              </IconButton>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Product;

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
