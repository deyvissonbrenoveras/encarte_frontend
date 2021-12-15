import { makeStyles } from '@material-ui/core';

export default makeStyles({
  root: {
    padding: 5,
    position: 'relative',
  },
  label: {
    width: 220,
    fontSize: 17,
    padding: 4,
    marginRight: 40,
  },
  content: {
    display: 'flex',
  },
  button: {
    width: 80,
    height: 30,
    border: '4px solid #e3e3e3',
    borderRadius: 6,
  },
  colorPicker: {
    position: 'absolute',
    top: -100,
    left: 0,
    zIndex: 10,
    display: (props) => (props.showPicker ? 'inline' : 'none'),
  },
  error: {
    color: '#ff0000',
    padding: 4,
  },
});
