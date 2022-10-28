import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import {
  Grid,
  Paper,
  Box,
  Card,
  CardMedia,
  IconButton,
  CardContent,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  ShoppingCart,
  Remove,
  Add,
  Delete,
  WhatsApp,
  DeleteForever,
} from '@material-ui/icons';
import useStyles, { pdfStyles } from './styles';
import {
  removeProduct,
  changeAmount,
  clearCart,
} from '../../../store/modules/cart/actions';
import PriceTypeEnum from '../../../util/PriceTypeEnum';
import LoadingIcon from '../../../components/LoadingIcon';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';

import {
  getQuantityToAdd,
  getQuantityToRemove,
} from '../../../helpers/productQuantityCalculationHelper';

function Cart({ match }) {
  const dispatch = useDispatch();
  const [clearCartModalVisible, setClearCartModalVisible] = useState(false);

  const { url } = match.params;
  const store = useSelector((state) => state.showcase.showcase);
  const { primaryColor, secondaryColor, tertiaryColor } = store;
  const classes = useStyles({ primaryColor, secondaryColor, tertiaryColor });
  const loading = useSelector((state) => state.showcase.loading);
  const cart = useSelector((state) => {
    return state.cart.cart.filter((crt) => crt.storeId === store.id)[0]
      ? state.cart.cart.filter((crt) => crt.storeId === store.id)[0].products
      : [];
  });
  const [total, setTotal] = useState(formatPrice(0));

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

  function handleRemove(productId) {
    dispatch(removeProduct(store.id, productId));
  }

  function handleRemoveAmount(product) {
    const newAmount = getQuantityToRemove(
      product.fractionedQuantity,
      product.amount
    );
    dispatch(changeAmount(store.id, product.id, newAmount));
  }

  function handleAddAmount(product) {
    const newAmount = getQuantityToAdd(
      product.fractionedQuantity,
      product.amount
    );
    dispatch(changeAmount(store.id, product.id, newAmount));
  }

  async function handleSend() {
    let buyList = await cart.reduce((list, product, index) => {
      let text = `${list} %0A%0A ${index + 1}: Id ${product.id} `;
      text += `%0AProduto: ${product.name}`;
      text += `%0APreço: ${
        product.priceType === PriceTypeEnum.SPECIAL_OFFER
          ? 'OFERTA ESPECIAL'
          : product.formattedPrice
      }`;
      text += `%0AQuantidade: ${product.amount}`;
      if (product.priceType !== PriceTypeEnum.SPECIAL_OFFER) {
        text += `%0ASubtotal: ${product.total}`;
      }
      return text;
    }, 'Lista de compras e-ncarte:');
    buyList += `%0A%0ATotal: ${total}`;
    buyList += `%0A%0AData de geração do pedido: ${new Date().toLocaleString()}`;
    window.open(
      `https://api.whatsapp.com/send?phone=${store.whatsapp}&text=${buyList}`
    );
    setClearCartModalVisible(true);
  }
  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentProduct) => {
      const price =
        currentProduct.Products_Stores.customPrice || currentProduct.price;
      return accumulator + price * currentProduct.amount;
    }, 0);
    setTotal(formatPrice(newTotal));
  }, [cart]);
  function ProductItemPrice(params) {
    const { product: prod } = params;

    switch (prod.priceType) {
      case PriceTypeEnum.DEFAULT:
        return (
          <div className={classes.productPrice}>{prod.formattedPrice}</div>
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
  return loading ? (
    <LoadingIcon />
  ) : (
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
              <Box className={classes.stickyTop} width="100%" textAlign="right">
                <Button
                  variant="contained"
                  color="delete"
                  size="small"
                  className={classes.clearCart}
                  onClick={() => {
                    setClearCartModalVisible(false);
                    dispatch(clearCart(store.id));
                  }}
                  startIcon={<DeleteForever />}
                >
                  Limpar carrinho
                </Button>
              </Box>

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
                          <ProductItemPrice product={product} />
                          <div className={classes.amountArea}>
                            <IconButton
                              onClick={() => {
                                handleRemoveAmount(product);
                              }}
                            >
                              <Remove />
                            </IconButton>
                            <input
                              type="number"
                              className={classes.productAmount}
                              value={product.amount}
                              min={product.fractionedQuantity ? 0.1 : 1}
                              max={500}
                              readOnly
                            />
                            <IconButton
                              onClick={() => {
                                handleAddAmount(product);
                              }}
                            >
                              <Add />
                            </IconButton>
                          </div>
                        </div>
                        <div className={classes.subTotal}>
                          {product.priceType !==
                            PriceTypeEnum.SPECIAL_OFFER && (
                            <>
                              <div>Subtotal:</div>
                              <div>{product.total}</div>
                            </>
                          )}

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

              <PDFDownloadLink
                className={classes.pdfListLink}
                document={
                  <Document>
                    <Page size="A4" style={pdfStyles.page} wrap>
                      <View style={pdfStyles.title}>
                        <Text>Lista de compras e-ncarte</Text>
                      </View>
                      {cart &&
                        cart.map((product, index) => (
                          <View style={pdfStyles.section}>
                            <Text style={pdfStyles.item}>
                              {`Produto ${index + 1}: ${product.name}`}
                            </Text>
                            <Text
                              style={pdfStyles.item}
                            >{`Quantidade: ${product.amount}`}</Text>
                            <Text style={pdfStyles.item}>{`Preço: ${
                              product.priceType === PriceTypeEnum.SPECIAL_OFFER
                                ? 'OFERTA ESPECIAL'
                                : product.formattedPrice
                            }`}</Text>
                            {product.priceType !==
                              PriceTypeEnum.SPECIAL_OFFER && (
                              <Text
                                style={pdfStyles.item}
                              >{`Subtotal: ${product.total}`}</Text>
                            )}
                          </View>
                        ))}
                      <View style={pdfStyles.title}>
                        <Text>{`Total: ${total}`}</Text>
                      </View>
                    </Page>
                  </Document>
                }
                fileName={`Lista de compras e-ncarte - ${store.name}`}
              >
                Baixar Lista de compras
              </PDFDownloadLink>
            </>
          )}
        </Paper>
      </Grid>
      <Dialog
        open={clearCartModalVisible}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Deseja limpar o carrinho?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setClearCartModalVisible(false);
            }}
            color="default"
            variant="contained"
          >
            Manter o carrinho
          </Button>
          <Button
            onClick={() => {
              setClearCartModalVisible(false);
              dispatch(clearCart(store.id));
            }}
            color="primary"
            variant="contained"
            startIcon={<DeleteForever />}
            autoFocus
          >
            Limpar o carrinho
          </Button>
        </DialogActions>
      </Dialog>
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
