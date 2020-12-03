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

import history from '../../../services/history';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';
import { addProduct } from '../../../store/modules/cart/actions';
import useStyles from './styles';

function Product({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = match.params;
  const productId = Number(match.params.productId);
  const [product, setProduct] = useState(null);
  const showcase = useSelector((state) => state.showcase.showcase);
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    if (showcase && showcase.products) {
      const prod = showcase.products
        .filter((pdt) => pdt.id === productId)
        .map((pdt) => {
          return { ...pdt, formattedPrice: formatPrice(pdt.price) };
        })[0];
      setProduct(prod);
      // setTotal(formatPrice(amount * prod ? prod.price : 0));
      setAmount(1);
    }
  }, [showcase]);

  useEffect(() => {
    async function getProduct() {
      try {
        dispatch(loadRequest(url));
      } catch (error) {
        toast.error('Houve um erro ao carregar o produto');
      }
    }
    getProduct();
  }, []);
  function handleAddProduct() {
    dispatch(addProduct(showcase.id, product, amount));
    history.push(`/loja/${url}/carrinho`);
  }
  async function decreaseAmount() {
    if (amount > 1) {
      await setAmount(amount - 1);
    }
  }
  async function increaseAmount() {
    await setAmount(amount + 1, () => {});
  }
  async function handleAmountChange(e) {
    if (e.target.value >= 0 && e.target.value <= 500) {
      await setAmount(Number(e.target.value));
    }
  }
  async function amountFocusOut(e) {
    if (e.target.value < 1 || e.target.value > 500) {
      await setAmount(1);
    }
  }
  useEffect(() => {
    if (product) {
      setTotal(formatPrice(amount * product.price));
    }
  }, [amount]);
  return (
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
                  {product.formattedPrice}
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
                  min={1}
                  max={500}
                  onChange={handleAmountChange}
                  onBlur={amountFocusOut}
                />
                <IconButton onClick={increaseAmount}>
                  <Add />
                </IconButton>
              </div>
              <div>{total || product.formattedPrice}</div>
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
