import React from 'react';
import PropTypes from 'prop-types';
//components
import {
    Grid,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// styles
import useStyle from './styles';
//icons
import { BsArrowRightShort } from 'react-icons/bs'

export function StoreCard({ store }) {
    const classes = useStyle();
    
    return (
        // <Grid item xs={6} md={4}>
            <Link to={`loja/${store.url}`} className={classes.storeCard}>
                <img
                    src={store.logo ? store.logo.url : ''}
                    alt={store.name}
                    className={classes.imgStore}
                />
                <div className={classes.bodyCard}>
                    <p>{store.name}</p>
                    <span>Endereço: {store.address}</span>
                    <button>Visitar <BsArrowRightShort /></button>
                </div>
            </Link>
        // </Grid>
    );
}

StoreCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    store: PropTypes.object.isRequired,
};