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
}));
