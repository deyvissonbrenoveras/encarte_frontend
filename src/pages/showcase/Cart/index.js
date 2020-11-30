import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Grid,
  Paper,
  Card,
  CardMedia,
  IconButton,
  CardContent,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingCart,
  Remove,
  Add,
  Delete,
  WhatsApp,
} from '@material-ui/icons';
import useStyles from './styles';
import {
  removeProduct,
  changeAmount,
} from '../../../store/modules/cart/actions';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';

function Cart({ match }) {
  const dispatch = useDispatch();
  const { url } = match.params;

  const classes = useStyles();
  const store = useSelector((state) => state.showcase.showcase);
  const cart = useSelector((state) => {
    return state.cart.cart.filter((crt) => crt.storeId === store.id)[0]
      ? state.cart.cart.filter((crt) => crt.storeId === store.id)[0].products
      : [];
  });
  const [total, setTotal] = useState(formatPrice(0));

  // useEffect(() => {
  //   console.tron.log(nonFilteredCart);
  //   const filteredCart = nonFilteredCart.filter(
  //     (prod) => prod.Products_Stores.storeId === store.id
  //   );
  //   setCart(filteredCart);
  // }, [store, nonFilteredCart]);

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
  function handleRemove(productId) {
    dispatch(removeProduct(store.id, productId));
  }
  function handleRemoveAmount(productId, amount) {
    dispatch(changeAmount(store.id, productId, amount));
  }
  function handleAddAmount(productId, amount) {
    dispatch(changeAmount(store.id, productId, amount));
  }

  async function handleSend() {
    let buyList = await cart.reduce((list, product, index) => {
      let text = `${list} %0A%0A ${index + 1}: Id ${product.id} `;
      text += `%0AProduto: ${product.name}`;
      text += `%0APreço: ${product.formattedPrice}`;
      text += `%0AQuantidade: ${product.amount}`;
      text += `%0ASubtotal: ${product.total}`;
      return text;
    }, 'Lista de compras e-ncarte:');
    buyList += `%0A%0ATotal: ${total}`;
    window.open(
      `https://api.whatsapp.com/send?phone=${store.whatsapp}&text=${buyList}`
    );
  }
  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.price * currentProduct.amount;
    }, 0);
    setTotal(formatPrice(newTotal));
  }, [cart]);

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Paper className={classes.paper}>
          {cart && cart.length === 0 ? (
            <div className={classes.emptyCart}>
              <ShoppingCart />
              <div>Carrinho Vazio</div>
            </div>
          ) : (
            <>
              {cart &&
                cart.map((product) => (
                  <Grid
                    item
                    xs={12}
                    className={classes.cardGrid}
                    key={product.id}
                  >
                    <Card
                      className={classes.productCard}
                      // onClick={() => {
                      //   history.push(`/loja/${url}/produto/${product.id}`);
                      // }}
                    >
                      <CardMedia
                        className={classes.productImage}
                        component="img"
                        alt={product.name}
                        image={product.image && product.image.url}
                        title={product.name}
                      />
                      <CardContent className={classes.content}>
                        <div className={classes.productInfo}>
                          <div>{product.name}</div>
                          <div className={classes.productPrice}>
                            {product.formattedPrice}
                          </div>
                          <div className={classes.amountArea}>
                            <IconButton
                              onClick={() => {
                                handleRemoveAmount(
                                  product.id,
                                  product.amount - 1
                                );
                              }}
                            >
                              <Remove />
                            </IconButton>
                            <input
                              type="number"
                              className={classes.productAmount}
                              value={product.amount}
                              min={1}
                              max={500}
                              readOnly
                            />
                            <IconButton
                              onClick={() => {
                                handleAddAmount(product.id, product.amount + 1);
                              }}
                            >
                              <Add />
                            </IconButton>
                          </div>
                        </div>
                        <div className={classes.subTotal}>
                          <div>Subtotal:</div>
                          <div>{product.total}</div>
                          <IconButton
                            onClick={() => {
                              handleRemove(product.id);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              <div className={classes.total}>
                Valor Total: {total}
                {store.whatsapp && (
                  <button type="button" onClick={handleSend}>
                    Enviar pedido <WhatsApp />
                  </button>
                )}
              </div>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Cart;

Cart.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
