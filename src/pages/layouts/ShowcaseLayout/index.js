import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { Store, ShoppingCart } from '@material-ui/icons';
import { useStyles } from './styles';
import logo from '../../../assets/logo.png';

function ShowcaseLayout({ children, match }) {
  const { url } = match.params;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <img className={classes.logo} src={logo} alt="logo" />
          <div className={classes.iconButtons}>
            <IconButton href={`/loja/${url}/info`}>
              <Store className={classes.icon} />
            </IconButton>
            <IconButton href={`/loja/${url}/carrinho`}>
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
