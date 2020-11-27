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
    [theme.breakpoints.down('xs')]: {
      maxWidth: 50,
      maxHeight: 50,
      padding: theme.spacing(1),
    },
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
    padding: theme.spacing(1),
    fontSize: 17,
    '& svg': {
      fontSize: 30,
      color: theme.palette.encarte,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
  },
  productPrice: {
    marginTop: theme.spacing(0.5),
    color: theme.palette.encarte,
    fontSize: 14,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  amountArea: {
    width: 100,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    '& svg': {
      fontSize: 15,
      [theme.breakpoints.down('xs')]: {
        fontSize: 10,
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: 60,
    },
  },
  productAmount: {
    width: 40,
    textAlign: 'center',
    outline: 'none',
    border: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
      width: 20,
    },
  },
  subTotal: {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    padding: theme.spacing(0.2),
    marginRight: theme.spacing(2),
    fontSize: 14,
    textAlign: 'right',
    '& div:nth-of-type(2)': {
      color: theme.palette.encarte,
      fontSize: 17,
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
    '& svg': {
      fontSize: 20,
      color: theme.palette.encarte,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
  },
  // total: {
  //   marginTop: theme.spacing(3),
  //   borderTop: `1px solid ${theme.palette.greyBorder}`,
  //   padding: theme.spacing(2),
  //   fontSize: 18,
  //   color: theme.palette.encarte,
  //   textAlign: 'right',
  // },
  total: {
    backgroundColor: '#fff',
    width: '95%',
    position: 'sticky',
    bottom: 10,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 10,
    height: 60,
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.encarte,
    paddingLeft: theme.spacing(2),
    fontSize: 17,
    '& svg': {
      fontSize: 30,
    },
    margin: '0 auto',
    '& button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 150,
      backgroundColor: theme.palette.encarte,
      color: '#fff',
      height: '100%',
      borderRadius: '0 10px 10px 0',
      border: 'none',
    },
  },
}));
