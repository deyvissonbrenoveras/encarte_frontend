import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#efefef',
    minHeight: 58,
  },
  logo: {
    width: 101,
  },
  icon: {
    width: 24,
    height: 24,
    color: theme.palette.encarte,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
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