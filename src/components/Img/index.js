import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import api from '../../services/api';
import useStyles from './styles';

const ImageInput = ({ name, submitName, label, ...rest }) => {
  const inputRef = useRef();

  const { registerField, error, defaultValue } = useField(submitName);
  const { registerField: imgRegisterField } = useField(name);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }
  useEffect(() => {
    imgRegisterField({
      name,
      setValue(_, value) {
        if (value) {
          setFile(value.id);
          setPreview(value.url || '');
        }
      },
    });
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name: submitName,
        ref: inputRef.current,
        path: 'dataset.file',
        clearValue(ref) {
          ref.value = '';
          setPreview('');
        },
        setValue() {},
      });
    }
  }, [inputRef, registerField]);
  const classes = useStyles();
  return (
    <Card className={classes.root} onClick={() => inputRef.current.click()}>
      <CardActionArea>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6">
            {label}
          </Typography>
          <input
            type="file"
            id={submitName}
            accept="image/*"
            data-file={file}
            ref={inputRef}
            onChange={handleChange}
            {...rest}
          />
        </CardContent>
        <CardMedia
          component="div"
          className={classes.media}
          image={preview || ''}
          title={label || ''}
        />
      </CardActionArea>
      {error && <span className={classes.error}>{error}</span>}
    </Card>
  );
};

export default ImageInput;
ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  submitName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
