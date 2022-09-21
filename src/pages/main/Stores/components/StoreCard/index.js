import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useStyle from './styles';
import Box from '@mui/material/Box';
import { BsArrowRightShort } from 'react-icons/bs';

export function StoreCard({ store }) {
  const classes = useStyle();

  return (
    <Link to={`loja/${store.url}`} className={classes.storeCard}>
      <img
        src={store.logo ? store.logo.url : ''}
        alt={store.name}
        className={classes.imgStore}
      />
      <div className={classes.bodyCard}>
        <h2>{store.name}</h2>
        <div>Endereço: {store.address}</div>
        {store.city && (
          <div>
            {store.city.name} - {store.city.state.uf}
          </div>
        )}
        <Box sx={{justifyContent: 'flex-end', display: 'flex', width: '100%'}}>
          <button>
            <BsArrowRightShort />
          </button>
        </Box>
      </div>
    </Link>
  );
}

StoreCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
