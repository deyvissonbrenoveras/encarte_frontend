import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  logo: {
    height: 50,
  },
  stickyTop: {
    [theme.breakpoints.down('sm')]: {
      padding: '.7rem',
    },
  },
  subtitle: {
    fontSize: '1rem',
    textAlign: 'left',
    letterSpacing: 1,
    fontWeight: 600,
    marginLeft: '15px',
    display: 'block',
    width: '100%',
    color: "#383838",
    marginBottom: '1.7rem'
  },
  container: {
    background: "#F2F3F4",
    height: "100vh",
    width: '100vw',
    overflowX: 'hidden'
  },
  search: {
    margin: theme.spacing(2),
    display: 'flex',
    justifyContent: ' center',
  },
  ContainerButtons: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
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
    margin: '.5rem 1.2rem',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      // background: 'orange'

    },
    [theme.breakpoints.down('sm')]: {
      margin: '.5rem',
      padding: '0px 1.2rem',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }
}));
