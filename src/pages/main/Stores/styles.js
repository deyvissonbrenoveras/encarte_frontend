import { makeStyles } from '@material-ui/core';
import { darken } from 'polished';

export default makeStyles((theme) => ({
  logo: {
    height: 50,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    margin: '10px 5px',
  },
  search: {
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: ' center',
  },
  storeCard: {
    height: 120,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: 10,
    color: '#000',
    '&:hover': {
      backgroundColor: darken(0.02, '#fff'),
    },
    '& img': {
      maxWidth: '70%',
      maxHeight: '70%',
    },
    '& h3': {
      fontSize: 14,
    },
  },
}));
