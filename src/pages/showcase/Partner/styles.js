import { makeStyles, lighten } from '@material-ui/core';

export default makeStyles((theme) => ({
  cover: {},
  backgroundLogoContainer: {
    background: (props) => {
      const gradientColor = lighten(props.primaryColor || '#efefef', 0.3);
      return `linear-gradient(90deg, ${gradientColor} 11%, ${props.primaryColor} 77%)`;
    },
    textAlign: 'center',
  },
  logoContainer: {
    padding: theme.spacing(2),
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  media: {
    maxHeight: 180,
    objectFit: 'contain',
  },
  cardContent: {
    padding: theme.spacing(0.5),
  },
  partnerName: {
    fontSize: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: theme.palette.encarte,
    fontWeight: '400',
  },
  socialNetworks: {
    width: '100%',
    textAlign: 'left',
    fontSize: 18,
    height: 64,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 10,
    padding: theme.spacing(0.5),
  },
  site: {
    width: '100%',
    textAlign: 'left',
    fontSize: 13,
    height: 30,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 10,
    color: theme.palette.stoke,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  contact: {
    width: '100%',
    textAlign: 'left',
    fontSize: 13,
    height: 30,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 10,
    color: theme.palette.stoke,
    padding: theme.spacing(1),
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
  productModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyTop: {
    position: 'sticky',
    top: 0,
  },
  buttonCloseModal: {
    background: 'none',
    color: 'inherit',
    border: ' none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
  },
  productModalContent: {
    width: '100%',
    maxWidth: 900,
    height: '90vh',
    backgroundColor: '#fff',
    overflow: 'scroll',
    padding: 0,
  },
  productModalGrid: {
    height: '100%',
    textAlign: 'center',
    marginBottom: 30,
    padding: '0 20px',
  },
  productModalImageContainer: {
    [theme.breakpoints.up('sm')]: {
      minHeight: 300,
    },

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productModalImage: {
    maxWidth: '80%',
    maxHeight: '50%',
  },
  productModalName: {
    fontSize: 18,
    marginTop: 15,
    color: theme.palette.stoke,
  },
  productModalStore: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
    padding: '0 20px',
  },
  productModalStoreSubtitle: {
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 15,
    padding: '0 20px',
  },
  productModalStoreButton: {
    display: 'flex',
    flexDirection: 'column',
  },

  productModalStoreImage: {
    width: 60,
    height: 60,
    '& .MuiAvatar-img': {
      objectFit: 'contain',
    },
  },
  overflow: {
    maxWidth: 80,
    height: 30,
    fontSize: 12,
  },
  customizableField: {
    marginTop: 20,
    marginBottom: 500,
  },
}));
