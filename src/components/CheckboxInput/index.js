import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { Container } from './styles';

export default function Input({ name, label, defaultChecked, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label>{label}</label>
      <input
        ref={inputRef}
        defaultChecked={defaultValue}
        name={name}
        id={fieldName}
        type="checkbox"
        {...rest}
      />
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  defaultChecked: false,
};
