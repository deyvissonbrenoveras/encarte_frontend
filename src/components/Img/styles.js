import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: {
    width: '100%',
    '& input': {
      display: 'none',
    },
  },
  content: {
    height: 50,
  },
  media: {
    width: '100%',
    height: 200,
    maxHeight: 200,
  },
  error: {
    color: '#ff0000',
  },
});
