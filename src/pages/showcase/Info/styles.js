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
  showcaseName: {
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
  address: {
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    height: 64,
    border: `1px solid ${theme.palette.greyBorder}`,
    borderRadius: 10,
    padding: theme.spacing(0.5),
    color: theme.palette.stoke,
  },
}));
