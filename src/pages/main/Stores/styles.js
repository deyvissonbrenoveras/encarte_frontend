import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  logo: {
    height: 50,
  },
  subtitle: {
    fontSize: '1rem',
    textAlign: 'left',
    letterSpacing: 1,
    fontWeight: 600,
    marginLeft: '15px',
    display:'block',
    width: '100%',
    color: "#383838",
    marginBottom: '1.7rem'
  },
  container: {
    background: "#F2F3F4",
    height: "100%"
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
  },
  searchInput: {
    width: '65%'
  },
  filterLocationInput: {
    width: '35%',
  },
  selectInputLocation: {
    width: '100%',
    marginTop: '14px'
  }
}));
