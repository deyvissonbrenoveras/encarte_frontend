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
}));
