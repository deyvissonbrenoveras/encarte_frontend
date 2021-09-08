import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: {
    width: '100%',
    minHeight: 200,
    '& input': {
      display: 'none',
    },
  },
  content: {
    height: 50,
  },
  actionArea: {
    minHeight: 220,
  },
  media: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
    margin: 10,
  },
  error: {
    color: '#ff0000',
  },
});
