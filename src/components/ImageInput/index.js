import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { FaCamera } from 'react-icons/fa';
import { Container } from './styles';
import api from '../../services/api';

function LogoInput({ inputName, inputId, inputLabel }) {
  const { defaultValue, registerField } = useField(inputId);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      registerField({
        name: inputName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label>
        {inputLabel}
        {preview ? <img src={preview} alt="" /> : <FaCamera />}
        <input
          type="file"
          id={inputId}
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

export default LogoInput;

LogoInput.propTypes = {
  inputName: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
};
