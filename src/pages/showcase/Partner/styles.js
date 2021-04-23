import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(0.5),
  },
  cover: {},
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 150,
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
    // margin: 10,
    backgroundColor: '#fff',
    overflow: 'scroll',
    padding: 0,
  },
  productModalGrid: {
    height: '100%',
    textAlign: 'center',
    // marginTop: 15,
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
  },
  overflow: {
    maxWidth: 80,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  customizableField: {
    marginTop: 20,
    marginBottom: 500,
  },
}));
