import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#efefef',
    // minHeight: 58,
    height: 35,
    [theme.breakpoints.up('sm')]: {
      height: 50,
    },
  },
  logo: {
    width: 101,
    [theme.breakpoints.down('xs')]: {
      width: 80,
    },
  },
  icon: {
    width: 24,
    height: 24,
    color: theme.palette.encarte,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('xs')]: {
      width: 18,
      height: 18,
    },
  },
  toolbar: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1000,
    minHeight: 35,

    [theme.breakpoints.up('sm')]: {
      minHeight: 50,
    },
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
