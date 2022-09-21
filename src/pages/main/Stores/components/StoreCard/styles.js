import { makeStyles } from '@material-ui/core';
import { darken } from 'polished';

export default makeStyles((theme) => ({
  storeCard: {
    height: 400,
    width: '90%',
    border: '.5px solid #000',
    borderRadius: '2rem',
    background: '#FFF',
    padding: 15,
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
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
      width: '45%',
      height: '90%',
      borderRadius: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '1rem',
      border: 'none',
      '& svg': {
        fontSize: '2.5rem',
        color: '#fff'
      },

      background: '#ED2F56',
      marginTop: 20,
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
