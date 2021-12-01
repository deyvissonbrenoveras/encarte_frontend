import { makeStyles, lighten } from '@material-ui/core';

export default makeStyles((theme) => ({
  cover: {},
  cardArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // maxHeight: 150,
  },
  media: {
    maxHeight: 320,
    objectFit: 'contain',
  },
  cardContent: {
    padding: theme.spacing(0.5),
  },
  productName: {
    width: '100%',
    height: 106,
    fontSize: 22,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productPrice: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    width: '100%',
    height: 46,
    fontSize: 19,
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
  },
  productDefaultPrice: {
    color: (props) => props.tertiaryColor || theme.palette.encarte,
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.3),
  },
  featuredPrice: {
    padding: theme.spacing(0.5),
    color: (props) => props.tertiaryColor || '#ff0000',
    backgroundColor: (props) => lighten(props.primaryColor || '#fff', 0.4),
    transform: 'skewX(-10deg)',
    borderRadius: 4,
    margin: theme.spacing(0.3),
    marginLeft: theme.spacing(1),
    border: '1px solid #e3e3e3',
    fontWeight: 'bold',
  },
  specialOfferProductPrice: {
    color: (props) => props.tertiaryColor || '#ff0000',
    fontWeight: 'bold',
    padding: theme.spacing(0.5),
    backgroundColor: (props) => lighten(props.primaryColor || '#fff', 0.4),
    transform: 'skewX(-10deg)',
    margin: theme.spacing(0.3),
    marginLeft: theme.spacing(1),
    borderRadius: 4,
    border: '1px solid #e3e3e3',
    wordWrap: 'break-word',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  productDescription: {
    marginTop: theme.spacing(3),
    width: '100%',
    textAlign: 'left',
    fontSize: 18,
    minHeight: 350,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 3,
    padding: theme.spacing(1),
    position: 'relative',
    '&::before': {
      content: '"Descrição"',
      fontSize: 14,
      position: 'absolute',
      top: -18,
      left: 0,
      color: theme.palette.stoke,
      fontWeight: '600',
    },
  },
  addProduct: {
    backgroundColor: (props) => props.primaryColor || '#fff',
    width: '95%',
    position: 'sticky',
    bottom: 10,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 10,
    height: 60,
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-around',
    fontWeight: 'bold',
    alignItems: 'center',
    color: (props) => props.tertiaryColor || theme.palette.encarte,
    fontSize: 17,
    '& svg': {
      fontSize: 30,
      color: (props) => props.secondaryColor || theme.palette.encarte,
      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
    margin: '0 auto',
  },
  productAmount: {
    backgroundColor: (props) => props.primaryColor || 'none',
    color: (props) => props.tertiaryColor || '#000',
    width: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    outline: 'none',
    border: 'none',
    [theme.breakpoints.down('xs')]: {
      width: 30,
    },
  },
}));
