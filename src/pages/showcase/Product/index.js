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
} from '@material-ui/core';
import { formatPrice } from '../../../util/format';
import { loadRequest } from '../../../store/modules/showcase/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import useStyles from './styles';

function Product({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { url } = match.params;
  const productId = Number(match.params.productId);
  const [product, setProduct] = useState({});
  const showcase = useSelector((state) => state.showcase.showcase);
  const loading = useSelector((state) => state.showcase.loading);
  useEffect(() => {
    if (showcase && showcase.products) {
      const prod = showcase.products
        .filter((pdt) => pdt.id === productId)
        .map((pdt) => {
          return { ...pdt, formattedPrice: formatPrice(pdt.price) };
        })[0];
      setProduct(prod);
      console.tron.log(prod);
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
  return (
    <Grid container justify="center">
      {loading ? (
        <LoadingIcon />
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
