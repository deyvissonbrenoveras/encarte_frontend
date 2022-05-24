import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import api from '../../services/api';
import useStyles from './styles';

const ImageInput = ({
  name,
  submitName,
  label,
  showRemoveButton,
  readOnly,
  ...rest
}) => {
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
  }, [imgRegisterField, name]);

  useEffect(() => {
    registerField({
      name: submitName,
      ref: inputRef.current,
      getValue(ref) {
        return ref.dataset.file || null;
      },
      clearValue(ref) {
        ref.value = '';
        setPreview('');
      },
      setValue() {},
    });
  }, [inputRef, registerField, submitName]);

  const classes = useStyles();

  return (
    <div>
      <Card
        className={classes.root}
        onClick={() => !readOnly && inputRef.current.click()}
      >
        <CardActionArea className={classes.actionArea}>
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
          {preview && (
            <img src={preview} alt={label || ''} className={classes.media} />
          )}
        </CardActionArea>
        {error && <span className={classes.error}>{error}</span>}
      </Card>

      {!readOnly && showRemoveButton && preview && (
        <Box width="100%" textAlign="right">
          <button
            style={{ background: 'none', border: 'none' }}
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
          >
            <DeleteForever style={{ width: 22, color: '#ff0000' }} />
          </button>
        </Box>
      )}
    </div>
  );
};

export default ImageInput;
ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  submitName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
