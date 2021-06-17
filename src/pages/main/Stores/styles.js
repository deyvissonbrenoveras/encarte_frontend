import { makeStyles } from '@material-ui/core';
import { darken } from 'polished';

export default makeStyles((theme) => ({
  storeCard: {
    // width: '100%',
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
