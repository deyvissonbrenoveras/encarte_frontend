import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  paper: {
    minHeight: 300,
    padding: theme.spacing(2),
  },
  emptyCart: {
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.greyBorder,
    '& svg': {
      fontSize: 100,
    },
  },
  cardGrid: {
    padding: theme.spacing(0.5),
  },
  productCard: {
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(0.5),
  },
  productImage: {
    maxWidth: 100,
    maxHeight: 100,
    objectFit: 'contain',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    padding: theme.spacing(0.2),
    fontSize: 17,
    '& svg': {
      fontSize: 30,
      color: theme.palette.encarte,
    },
  },
  productPrice: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.encarte,
    fontSize: 14,
  },
  amountArea: {
    width: 100,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& svg': {
      fontSize: 15,
    },
  },
  productAmount: {
    width: 40,
    textAlign: 'center',
    outline: 'none',
    border: 'none',
  },
  total: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: theme.spacing(0.2),
    marginRight: theme.spacing(2),
    fontSize: 17,

    '& svg': {
      fontSize: 20,
      color: theme.palette.encarte,
    },
  },
}));
