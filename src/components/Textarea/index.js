import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

export default function Textarea({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    const path = rest.type === 'checkbox' ? 'checked' : 'value';
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path,
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>

      <textarea
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Textarea.defaultProps = {
  label: '',
};
