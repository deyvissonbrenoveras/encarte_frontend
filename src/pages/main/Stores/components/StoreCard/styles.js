import { makeStyles } from '@material-ui/core';
import { darken } from 'polished';

export default makeStyles((theme) => ({
  storeCard: {
    height: 400,
    width: '100%',
    boxShadow: '3px 5px 14px -2px rgba(0,0,0,0.46)',
    background: '#FFF',
    padding: 15,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '5px',
    color: '#000',
    transition: 'all  .2s',
    backgroundColor: darken(0.02, '#fff'),
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: '3px 5px 14px -2px rgba(0,0,0,0.46)',
    },
    '& img': {
      maxHeight: '40%',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      objectFit: 'contain',
    },
    '& h3': {
      fontSize: 14,
    },
    '& button': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& svg': {
        fontSize: '2rem',
      },

      background: '#fff',
      border: '2px solid #4d4d4d',
      padding: '0.8rem 1.4rem',
      color: '#4d4d4d',
      borderRadius: '4px',
      marginTop: 20,

      fontSize: '1rem',
      lineHeight: '1rem',
      letterSpacing: '2px',
      fontWeight: '600',
    },
  },
  bodyCard: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    '& div': {
      fontSize: 17,
      color: 'rgb(66, 70, 77)',
      margin: 2,
    },
  },
  imgStore: {
    width: '100%',
  },
}));
