import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Badge,
} from '@material-ui/core';
import { Store, ShoppingCart, Info, Search } from '@material-ui/icons';
import ReactGA from 'react-ga';
import { useStyles } from './styles';
import logo from '../../../assets/logo.webp';
import history from '../../../services/history';
import { updateSearch } from '../../../store/modules/search/actions';
import LoadingIcon from '../../../components/LoadingIcon';

function ShowcaseLayout({ children, match, showSearchBar }) {
  const dispatch = useDispatch();
  const showcase = useSelector((state) => state.showcase.showcase);
  const loading = useSelector((state) => state.showcase.loading);
  const cart = useSelector((state) => {
    return state.cart.cart.filter((crt) => crt.storeId === showcase.id)[0]
      ? state.cart.cart.filter((crt) => crt.storeId === showcase.id)[0].products
      : [];
  });

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const count = cart.reduce(
      (previous, current) => previous + current.amount,
      0
    );
    setCartItemsCount(count);
  }, [cart]);

  const { primaryColor, secondaryColor, tertiaryColor } = showcase;

  const classes = useStyles({ primaryColor, secondaryColor, tertiaryColor });

  ReactGA.initialize('UA-156689102-1');
  if (window.location.hostname.includes('e-ncarte.com')) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  const { url } = match.params;

  return (
    <div className={classes.root}>
      {!loading && (
        <AppBar elevation={0} className={classes.appBar} position="sticky">
          <Toolbar className={classes.toolbar} variant="dense">
            {showSearchBar && (
              <TextField
                size="small"
                variant="outlined"
                onChange={(e) => {
                  dispatch(updateSearch(e.target.value));
                }}
                className={classes.searchInput}
                // label="Busque por produtos"
                placeholder="Busque por produtos"
                //fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: primaryColor }}
              />
            )}

            <div className={classes.actionContainer}>
              <Button
                className={classes.logoButton}
                onClick={() => {
                  history.push('/');
                }}
              >
                <img
                  className={classes.showcaseLogo}
                  src={showcase.logo && showcase.logo.url}
                  alt="logo"
                />
              </Button>
              {/* <input
            type="text"
            placeholder="Busque por nome ou descrição do produto"
            onChange={(e) => {
              dispatch(updateSearch(e.target.value));
            }}
          /> */}

              <div className={classes.iconButtons}>
                {/* <Button
              className={classes.logoButton}
              onClick={() => {
                history.push('/');
              }}
            >
              <img className={classes.logo} src={logo} alt="logo" />
            </Button> */}
                <IconButton
                  onClick={() => {
                    history.push(`/loja/${url}`);
                  }}
                >
                  <Store className={classes.icon} />
                </IconButton>
                <IconButton
                  onClick={() => {
                    history.push(`/loja/${url}/info`);
                  }}
                >
                  <Info className={classes.icon} />
                </IconButton>

                <IconButton
                  onClick={() => {
                    history.push(`/loja/${url}/carrinho`);
                  }}
                >
                  <Badge
                    badgeContent={cartItemsCount}
                    color="primary"
                    className={classes.iconBadge}
                  >
                    <ShoppingCart className={classes.icon} />
                  </Badge>
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      )}
      {children}
    </div>
  );
}

export default ShowcaseLayout;

ShowcaseLayout.propTypes = {
  children: PropTypes.element.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
