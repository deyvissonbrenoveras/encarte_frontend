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
  carousel: {
    margin: '20px 0',
  },
  carouselItem: {
    height: 340,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  carouselAdvertisementItem: {
    height: 340,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselAdvertisementImg: {
    objectFit: 'contain',
    width: '100%',
    maxWidth: 1000,
    maxHeight: 450,
  },
  carouselProduct: {
    flex: 0.48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    maxHeight: 450,
    '& img': {
      maxWidth: 250,
      maxHeight: 250,
      [theme.breakpoints.down('sm')]: {
        maxWidth: 150,
        maxHeight: 150,
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: 80,
        maxHeight: 80,
      },
    },
  },
  carouselProductInfo: {
    padding: '10px 10px 10px 20px',
    width: '100%',
    heigth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselProductName: {
    fontSize: 26,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  },
  carouselProductPrice: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 10,
    },
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
    maxWidth: 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'initial',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
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
  addCartButton: {
    marginRight: 10,
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
