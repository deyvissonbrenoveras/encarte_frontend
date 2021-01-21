import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { TextField } from '@material-ui/core';

export default function Input({ name, label, variant, size, type, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const [shrink, setShrink] = useState(type === 'date' ? true : !!defaultValue);
  useEffect(() => {
    // const path = rest.type === 'checkbox' ? 'checked' : 'value';
    registerField({
      name,
      ref: inputRef.current,
      getValue: (ref) => {
        if (type === 'number' && ref.value === '') {
          return null;
        }
        return type === 'date' && !ref.value ? null : ref.value;
      },
      clearValue: (ref, value) => {
        ref.value = '';
        if (type !== 'date') {
          setShrink(!!value);
        }
      },
      setValue: (ref, value) => {
        ref.value =
          value && type === 'date'
            ? new Date(value).toISOString().split('T')[0]
            : value || '';
        if (type !== 'date') {
          setShrink(!!value);
        }
      },
    });
  }, [fieldName, registerField, name, type]);

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

    if (input && type !== 'date') {
      input.addEventListener('focus', handlerFocusEvent);
      input.addEventListener('blur', handlerBlurEvent);
    }

    return () => {
      if (input && type !== 'date') {
        input.removeEventListener('focus', handlerFocusEvent);
        input.removeEventListener('blur', handlerBlurEvent);
      }
    };
  }, [inputRef, type]);

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
