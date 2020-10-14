import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            id={fieldName}
            inputRef={inputRef}
            defaultChecked={defaultValue}
            color="primary"
            {...rest}
          />
        }
        label={label}
      />
      {error && <span>{error}</span>}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: '',
};
