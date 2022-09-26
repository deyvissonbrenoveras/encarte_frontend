import { makeStyles, lighten, darken } from '@material-ui/core';

export default makeStyles((theme) => ({
  name: {
    textAlign: 'center',
    padding: 0,
  },
  showcaseName: {
    background: (props) => {
      const gradientColor = lighten(props.primaryColor || '#efefef', 0.3);
      return `linear-gradient(90deg, ${gradientColor} 11%, ${props.primaryColor} 77%)`;
    },
    fontSize: 20,
    color: (props) => props.quaternaryColor,
    textAlign: 'center',
    padding: '5px 0',
  },
  cover: {},
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingTop: theme.spacing(1),
    padding: theme.spacing(0.2),
    textAlign: 'center',
    color: (props) => props.tertiaryColor || '#000',
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
    maxHeight: 300,
    '& img': {
      maxWidth: 160,
      maxHeight: 160,
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
    color: '#000',
  },
  carouselProductName: {
    textAlign: 'center',
    maxWidth: 250,
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
  carouselspecialOfferProductPrice: {
    color: (props) => props.tertiaryColor || '#ff0000',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 1,
    padding: theme.spacing(0.5),
    backgroundColor: (props) => lighten(props.primaryColor || '#fff', 0.4),
    transform: 'skewX(-10deg)',
    margin: theme.spacing(0.3),
    borderRadius: 4,
    border: (props) =>
      `1px solid ${lighten(props.tertiaryColor || '#e3e3e3', 0.7)}`,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      padding: theme.spacing(0.1),
    },
  },
  partnerAvatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
    fontSize: 14,
    fontWeight: 'bold',
    display:'flex',
    flexDirection: 'column'
  },
  partnerContainer: {
    background: (props) => {
      const gradientColor = lighten(props.primaryColor || '#efefef', 0.3);
      return `linear-gradient(90deg, ${gradientColor} 11%, ${props.primaryColor} 77%)`;
    },
    borderBottom: (props) =>
      `2px solid ${darken(props.secondaryColor || theme.palette.encarte, 0.4)}`,
  },
  partnersTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    paddingTop: theme.spacing(1),
    padding: theme.spacing(0.2),
    textAlign: 'center',
    color: (props) => props.quaternaryColor || '#000',
  },
  partnerList: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    margin: 6,
    borderRadius: 10,
    padding: theme.spacing(0.8),
    overflowX: 'scroll',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-around',
      '& li': {
        marginLeft: theme.spacing(3),
      },
    },
    textAlign: 'center',
    color: (props) => props.tertiaryColor || '#000',
    '& li': {
      marginLeft: theme.spacing(1.5),
    },
    '& .MuiButtonBase-root': {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  },
  overflow: {
    maxWidth: 120,
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
  productsContainer: {
    padding: theme.spacing(3),
  },
  categoryContainer: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  categoryName: {
    color: '#3F3E3E',//(props) => props.tertiaryColor || '#616161',
    display: 'inline-block',
    justifySelf: 'center',
    textAlign: 'center',
    letterSpacing: 3,
    fontSize: '2rem',
    padding: theme.spacing(1),
    borderRadius: 6,
    fontWeight: 'bold',
    fontStyle: 'italic',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
  cardGrid: {
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
  productContentOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '80%',
    borderRadius: '1rem',
    zIndex: 999,
    transition: 'all 0.2s ease-in-out',
  },
  productCard: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    cursor: 'default',
    borderRadius: '1rem',
    background: '#F2F2F2', 
    border: (props) =>
      `1px solid ${lighten(props.secondaryColor || '#fff', 0.8)}`,
    '&:hover': {
      padding: 0,
      paddingLeft: 0,
      color: '#fff',
      borderColor: (props) => lighten(props.secondaryColor || '#fff', 0.5),
      '& #productContentOverlay': {
        // backgroundColor: 'orange',
      },
      '& #productContent a, #productPrice': {
        color: '#fff',
      }
    },
  },
  
  productImage: {
    padding: theme.spacing(1),
    height: '50%',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  productContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    textAlign: 'left',
    fontSize: 21,
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    '& a': {
      color: '#000',
      overflow: 'hidden',
      fontWeight: 100,
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      textAlign: 'center',
      margin: '0 auto',
      '-webkit-line-clamp': 3,
      '-webkit-box-orient': 'vertical',
      '&:hover': {
        color: theme.palette.stoke,
      },
    },
    '& .MuiButtonBase-root': {
      padding: 0,
    },
    '& svg': {
      fontSize: 30,
    },
  },
  buyProductButton: {
    display: 'flex',
    gap: '2rem',
    width: '100%',
    fontSize: 17,
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    color:  '#6D6D6D',
    fontWeight: 'bold',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    "&:hover": {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '& .iconPlus': {
      marginLeft: '1rem'
    }
  },
  footerCardProduct: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  productPrice: {
    color: '#545454',//(props) => props.tertiaryColor || theme.palette.encarte,
    fontSize: 19,
    fontWeight: 'bold',
  },
  featuredPrice: {
    padding: theme.spacing(0.5),
    color: (props) => props.tertiaryColor || '#ff0000',
    fontSize: 19,
    backgroundColor: (props) => lighten(props.primaryColor || '#fff', 0.4),
    transform: 'skewX(-10deg)',
    borderRadius: 4,
    margin: theme.spacing(0.3),
    border: (props) =>
      `1px solid ${lighten(props.tertiaryColor || '#e3e3e3', 0.7)}`,
    fontWeight: 'bold',
  },
  specialOfferProductPrice: {
    color: (props) => props.tertiaryColor || '#ff0000',
    fontSize: 19,
    fontWeight: 'bold',
    padding: theme.spacing(0.5),
    backgroundColor: (props) => lighten(props.primaryColor || '#fff', 0.4),
    transform: 'skewX(-10deg)',
    margin: theme.spacing(0.3),
    borderRadius: 4,
    border: (props) =>
      `1px solid ${lighten(props.tertiaryColor || '#e3e3e3', 0.7)}`,
  },
  addCartButton: {
    marginRight: 10,
    '& svg': {
      color: (props) => props.secondaryColor,
    },
  },
  footer: {
    color: '#fff',
    width: '100%',
    height: 400,
    marginTop: 300,
    borderTop: (props) =>
      `2px solid ${darken(props.secondaryColor || theme.palette.encarte, 0.4)}`,
    '& .MuiCardContent-root': {
      display: 'flex',
      justifyContent: 'center',
      padding: 0,
    },
  },
  showcaseFooter: {
    backgroundColor: '#2e2e2e',
    background: () => {
      const gradientColor = lighten('#2e2e2e', 0.15);
      return `linear-gradient(90deg, ${gradientColor} 11%, #2e2e2e 77%)`;
    },
    paddingBottom: theme.spacing(4),
  },
  footerStoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(1),
  },
  footerStoreCard: {
    padding: theme.spacing(2),
    maxWidth: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerMedia: {
    width: '100%',
    maxHeight: 200,
    objectFit: 'contain',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 100,
    },
  },
  footerCardAction: {
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
  },
  footerCover: {},
  footerInfo: {
    paddingTop: theme.spacing(2),
    textAlign: 'center',
    fontSize: 17,
  },
  encarteFooter: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 15,
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    borderTop: '2px solid #fff',
    background: '#262626',
  },
  encarteFooterLogo: {
    maxWidth: 200,
    maxHeight: 200,
    margin: '15px 0',
  },
  containerCards: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',	
    gap: 2,
    overflowX: 'auto',
    padding: '5px 0px',
    height: '200px',
    width: '100%',
  },
  cardsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: 2,
    width: '100%',
    height: '100%',
    overflowX: 'auto !important',
    padding: '0px 1rem',
  }
}));
