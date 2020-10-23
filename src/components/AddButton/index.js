import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import useStyles from './styles';

function AddButton({ to }) {
  const classes = useStyles();
  return (
    <Link to={to} className={classes.fab}>
      <Fab size="medium" color="secondary" aria-label="add">
        <Add />
      </Fab>
    </Link>
  );
}

export default AddButton;

AddButton.propTypes = {
  to: PropTypes.string.isRequired,
};
