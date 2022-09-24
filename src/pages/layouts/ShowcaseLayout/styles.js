import { darken, makeStyles, lighten } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    // background: (props) => {
    //   const gradientColor = lighten(props.primaryColor || '#efefef', 0.3);
    //   return `linear-gradient(90deg, ${gradientColor} 11%, ${props.primaryColor} 77%)`;
    // },
    background: (props) => props.primaryColor ,
    padding: '1rem',
    minHeight: 80,
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
    width: 32,
    height: 32,
    color: '#3E3939',//(props) => props.secondaryColor || theme.palette.encarte,
    padding: 0,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      width: 22,
      height: 22,
    },
  },
  searchInput: {
    width: '100%',
    maxWidth: 600,
    margin: '4px 20px',
    '& .MuiFormControl-root': {
      fontSize: '11',
      height: 15,
    },
    '& .MuiInputBase-root': {
      height: 40,
      backgroundColor: '#F1F1F1',
    },
    '& .MuiFormLabel-root': {
      fontSize: 12,
    },
    // '& .MuiOutlinedInput-notchedOutline': {
    //   borderColor: (props) => props.secondaryColor || '#fff',
    // },
    // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //   borderColor: (props) => props.secondaryColor || '#fff',
    // },
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
    color: 'red !important'
  },
  toolbar: {
    margin: '0 auto',
    width: '100%',
    // maxWidth: 1000,
    minHeight: 60,
    backgroundColor: 'white',
    borderRadius: '.55rem',
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
