import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  name: {
    textAlign: 'center',
    padding: 0,
  },
  cover: {},
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 150,
  },
  media: {
    maxHeight: 150,
    objectFit: 'contain',
  },
  subtitle: {
    marginTop: theme.spacing(1.5),
    marginLeft: theme.spacing(1),
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(0.3),
  },
  partnerList: {
    padding: theme.spacing(0.8),
    overflow: 'scroll',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(1.5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
    },
  },
  overflow: {
    maxWidth: 50,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  productGrid: {
    padding: theme.spacing(0.2),
  },
  featuredProductCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 115,
  },
  featuredProductImage: {
    maxWidth: 100,
    maxHeight: 100,
    objectFit: 'contain',
  },
  search: {
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: ' center',
  },
  productsContainer: {},
  categoryName: {
    color: '#616161',
    letterSpacing: 3,
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    padding: theme.spacing(0.5),
  },
  productCard: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(0.5),
  },
  productImage: {
    maxWidth: 43,
    maxHeight: 60,
    objectFit: 'contain',
  },
  productContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    textAlign: 'right',
    fontSize: 13,
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
  },
  productPrice: {
    color: theme.palette.encarte,
    fontSize: 14,
  },
}));
