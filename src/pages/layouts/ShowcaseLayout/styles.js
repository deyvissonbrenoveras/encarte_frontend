import { darken, makeStyles, lighten } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: (props) => {
      const gradientColor = lighten(props.primaryColor || '#efefef', 0.3);
      return `linear-gradient(90deg, ${gradientColor} 11%, ${props.primaryColor} 77%)`;
    },
    minHeight: 60,
  },
  logoButton: {
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    '&:hover': {
      backgroundColor: `${darken('#efefef', 0.02)}`,
    },
  },
  showcaseLogo: {
    maxWidth: 100,
    maxHeight: 35,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 70,
      maxHeight: 25,
    },
  },
  iconBadge: {
    ' & span': {
      minWidth: 0,
      minHeight: 0,
      width: 14,
      height: 14,
      fontSize: 10,
      transform: 'scale(1) translate(60%, -60%)',
      color: (props) => props.tertiaryColor,
      backgroundColor: (props) => props.quaternaryColor || '#fff',
    },
  },
  icon: {
    width: 24,
    height: 24,
    color: (props) => props.secondaryColor || theme.palette.encarte,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      width: 18,
      height: 18,
    },
  },
  searchInput: {
    width: '100%',
    maxWidth: 600,
    background: '#fff',
    margin: '4px 20px',
    '& .MuiFormControl-root': {
      fontSize: '11',
      height: 10,
    },
    '& .MuiInputBase-root': {
      height: 30,
      backgroundColor: '#fff',
    },
    '& .MuiFormLabel-root': {
      fontSize: 12,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: (props) => props.secondaryColor || '#fff',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: (props) => props.secondaryColor || '#fff',
    },
    [theme.breakpoints.down('xs')]: {
      order: 2,
    },
  },
  outlinedSearchInput: {},
  actionContainer: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
    },
    display: 'flex',
    flexOrder: 1,
  },
  iconButtons: {
    display: 'flex',
  },
  toolbar: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1000,
    minHeight: 50,
    [theme.breakpoints.down('xs')]: {
      minHeight: 35,
      flexDirection: 'column',
    },
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
