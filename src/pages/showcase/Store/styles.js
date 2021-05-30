import { makeStyles } from '@material-ui/core';
import footerImage from '../../../assets/footerImage.webp';

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
    maxHeight: 200,
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 100,
    },
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: theme.spacing(1),
    margin: theme.spacing(0.2),
    textAlign: 'center',
  },
  partnerAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(0.3),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    '& .MuiAvatar-img': {
      objectFit: 'contain',
    },
  },
  sponsorshipAvatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginBottom: theme.spacing(0.3),
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    '& .MuiAvatar-img': {
      objectFit: 'contain',
    },
  },
  shelfLife: {
    padding: theme.spacing(0.2),
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),
    fontSize: 10,
    fontWeight: 'bold',
  },
  partnerList: {
    padding: theme.spacing(0.8),
    overflow: 'scroll',
    // width: '100%',
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-around',
    },
    textAlign: 'center',
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      letterSpacing: 1,
    },
  },
  overflow: {
    maxWidth: 80,
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
    height: 90,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(0.5),
    cursor: 'default',
  },
  productImage: {
    maxWidth: 43,
    maxHeight: 60,
    objectFit: 'contain',
    cursor: 'pointer',
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
    '& a': {
      color: '#000',
      '&:hover': {
        color: theme.palette.stoke,
      },
    },
    '& .MuiButtonBase-root': {
      padding: 0,
    },
    '& svg': {
      fontSize: 18,
    },
  },
  productPrice: {
    color: theme.palette.encarte,
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredPrice: {
    padding: theme.spacing(0.5),
    color: '#ff0000',
    fontSize: 14,
    backgroundColor: 'yellow',
    transform: 'skewX(-10deg)',
    borderRadius: 4,
    margin: theme.spacing(0.3),
    border: '1px solid #e3e3e3',
    fontWeight: 'bold',
  },
  specialOfferProductPrice: {
    color: '#ff0000',
    fontSize: 13,
    fontWeight: 'bold',
    padding: theme.spacing(0.5),
    backgroundColor: 'yellow',
    transform: 'skewX(-10deg)',
    margin: theme.spacing(0.3),
    borderRadius: 4,
    border: '1px solid #e3e3e3',
  },
  footer: {
    backgroundImage: `url(${footerImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: '100%',
    height: 400,
    marginTop: theme.spacing(5),
    paddingTop: theme.spacing(2),
    borderTop: `2px solid ${theme.palette.encarte}`,
    '& .MuiCardContent-root': {
      display: 'flex',
      justifyContent: 'center',
      padding: 0,
    },
  },
  footerInfo: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: '#fff',
  },
}));
