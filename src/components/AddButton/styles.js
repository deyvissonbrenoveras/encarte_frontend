import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  fab: {
    zIndex: 1000,
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
