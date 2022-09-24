import { makeStyles, lighten, darken } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
      borderRadius: '1rem',
      width: '130px !important',
      height: '162px !important',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      cursor: 'pointer',
      transition: 'all .1s ease-in-out',
      '& label': {
        fontSize: '1.5rem',
        color: '#fff',
        fontWeight: '700'
      },
      '&:hover': {
        transform: 'scale(1.1)',
        backgroundColor: '#F6AD55',
      }
  },
  active: {
    backgroundColor: '#F6AD55',
  },
  normal: {
    backgroundColor: '#ccc',
  },
  containerIcon: {
    fontSize: '3.5rem',
    color: '#fff'
  }
}));
