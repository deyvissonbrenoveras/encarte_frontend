// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useField } from '@unform/core';
// import { FaCamera } from 'react-icons/fa';
// import { Container } from './styles';
// import api from '../../services/api';

// function LogoInput({ inputName, inputId, inputLabel }) {
//   const { defaultValue, registerField, error } = useField(inputId);
//   const [file, setFile] = useState(defaultValue && defaultValue.id);
//   const [preview, setPreview] = useState(defaultValue && defaultValue.url);

//   const ref = useRef();
//   useEffect(() => {
//     if (ref.current) {
//       registerField({
//         name: inputName,
//         ref: ref.current,
//         path: 'dataset.file',
//         setValue(_, value) {
//           console.tron.log(value);
//           setPreview(value);
//         },
//       });
//     }
//   }, [inputName, registerField]);

//   async function handleChange(e) {
//     const data = new FormData();
//     data.append('file', e.target.files[0]);
//     const response = await api.post('files', data);
//     const { id, url } = response.data;
//     setFile(id);
//     setPreview(url);
//   }
//   return (
//     <>
//       <Container>
//         <label>
//           {inputLabel}
//           {preview ? <img src={preview} alt="" /> : <FaCamera />}
//           <input
//             type="file"
//             id={inputId}
//             accept="image/*"
//             data-file={file}
//             onChange={handleChange}
//             ref={ref}
//           />
//         </label>
//       </Container>
//       {error && <span>{error}</span>}
//     </>
//   );
// }

// export default LogoInput;

// LogoInput.propTypes = {
//   inputName: PropTypes.string.isRequired,
//   inputId: PropTypes.string.isRequired,
//   inputLabel: PropTypes.string.isRequired,
// };

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaCamera } from 'react-icons/fa';
import { useField } from '@unform/core';
import { Container } from './styles';

import api from '../../services/api';

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
          setPreview(value.url);
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
          setPreview(null);
        },
        setValue() {},
      });
    }
  }, [inputRef, registerField]);

  return (
    <>
      <Container>
        <label>
          {label}
          {preview ? <img src={preview} alt="" /> : <FaCamera />}
          <input
            type="file"
            id={submitName}
            accept="image/*"
            data-file={file}
            ref={inputRef}
            onChange={handleChange}
            {...rest}
          />
        </label>
        {error && <span>{error}</span>}
      </Container>
    </>
  );
};

export default ImageInput;
ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  submitName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
