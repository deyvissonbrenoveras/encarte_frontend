import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  logo: {
    height: 50,
  },
  containerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  stickyTop: {
    backgroundColor: '#ED2F56',
    borderBottom: '1rem solid #FC6B89',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',

    [theme.breakpoints.down('sm')]: {
      padding: '.7rem',
    },
  },
  subtitle: {
    fontSize: '1rem',
    textAlign: 'left',
    letterSpacing: 1,
    fontWeight: 600,
    display: 'block',
    width: '90%',
    color: '#383838',
    marginBottom: '1.2rem',
  },
  container: {
    background: '#fff',
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden',
    paddingBottom: 250,
  },
  search: {
    margin: theme.spacing(2),
    display: 'flex',
    width: '90%',
  },
  ContainerButtons: {
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '.7rem'
    },
  },
  searchInput: {
    width: '65%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  filterLocationInput: {
    width: '35%',
    marginRight: '0.25rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0px !important',
    },
  },
  selectInputLocation: {
    width: '100%',
    marginTop: '14px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px !important',
    },
  },
  containerStores: {
    maxWidth: '90%',
  },
}));
