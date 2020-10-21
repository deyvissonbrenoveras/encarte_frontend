import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { TextField } from '@material-ui/core';

export default function Input({ name, label, variant, size, type, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [shrink, setShrink] = useState(!!defaultValue);
  useEffect(() => {
    // const path = rest.type === 'checkbox' ? 'checked' : 'value';
    registerField({
      name,
      ref: inputRef.current,
      getValue: (ref) => {
        return ref.value;
      },
      clearValue: (ref, value) => {
        ref.value = '';
        setShrink(!!value);
      },
      setValue: (ref, value) => {
        ref.value = value || '';
        setShrink(!!value);
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    const input = inputRef.current;

    function handlerFocusEvent(evt) {
      const inputValue = evt.currentTarget.value;
      if (!inputValue) setShrink(true);
    }

    function handlerBlurEvent(evt) {
      const inputValue = evt.target.value;
      if (!inputValue) setShrink(false);
    }

    if (input) {
      input.addEventListener('focus', handlerFocusEvent);
      input.addEventListener('blur', handlerBlurEvent);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handlerFocusEvent);
        input.removeEventListener('blur', handlerBlurEvent);
      }
    };
  }, [inputRef]);

  return (
    <>
      <TextField
        id={fieldName}
        inputRef={inputRef}
        label={label}
        error={error}
        variant={variant}
        size={size}
        type={type}
        defaultValue={defaultValue || ''}
        InputLabelProps={{
          shrink,
        }}
        inputProps={type === 'number' ? { step: 'any' } : {}}
        {...rest}
      />
      {error && (
        <span style={{ color: '#ff0000', display: 'block' }}>{error}</span>
      )}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  variant: 'outlined',
  size: 'small',
  type: 'text',
};
