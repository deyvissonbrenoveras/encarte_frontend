import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Store, ShoppingCart, Info } from '@material-ui/icons';
import { useStyles } from './styles';
import logo from '../../../assets/logo.png';
import history from '../../../services/history';

function ShowcaseLayout({ children, match }) {
  const { url } = match.params;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appBar} position="sticky">
        <Toolbar className={classes.toolbar}>
          <img className={classes.logo} src={logo} alt="logo" />
          <div className={classes.iconButtons}>
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
              <ShoppingCart className={classes.icon} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
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