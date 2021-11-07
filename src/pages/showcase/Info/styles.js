import { makeStyles, lighten } from '@material-ui/core';

export default makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(0.5),
  },
  cover: {},
  backgroundLogoContainer: {
    background: (props) => props.primaryColor || '#efefef',
    background: (props) => {
      const gradientColor = lighten(props.primaryColor || '#efefef', 0.3);
      return `linear-gradient(90deg, ${gradientColor} 11%, ${props.primaryColor} 77%)`;
    },
    textAlign: 'center',
  },
  logoContainer: {
    padding: theme.spacing(2),
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  media: {
    width: '100%',
    maxWidth: 600,
    maxHeight: 180,
    objectFit: 'contain',
  },
  showcaseName: {
    fontSize: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    color: '#000',
    fontWeight: '400',
  },
  socialNetworks: {
    width: '100%',
    textAlign: 'left',
    fontSize: 18,
    height: 64,
    border: (props) =>
      `2px solid ${props.secondaryColor || theme.palette.greyBorder}`,
    borderRadius: 10,
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
  },
  address: {
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    height: 64,
    border: (props) =>
      `2px solid ${props.secondaryColor || theme.palette.greyBorder}`,
    borderRadius: 10,
    padding: theme.spacing(0.5),
    color: theme.palette.stoke,
  },
}));
