import React, { useRef, useEffect, useState, useCallback } from 'react';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

function RadioInputGroup({
  name,
  label,
  options,
  onTypeChange,
  readOnly,
  ...rest
}) {
  const radioRef = useRef(null);

  const { fieldName, registerField, error } = useField(name);

  const [selected, setSelected] = useState(0);

  const handleOnTypeChange = useCallback(
    (type) => {
      if (onTypeChange) {
        onTypeChange(type);
      }
    },
    [onTypeChange]
  );

  function handleChange(event) {
    if (!readOnly) {
      setSelected(Number(event.target.value));
      handleOnTypeChange(Number(event.target.value));
    }
  }

  useEffect(() => {
    registerField({
      name,
      ref: radioRef.current,
      getValue: () => {
        return selected;
      },
      setValue: (_, value) => {
        setSelected(Number(value));
        handleOnTypeChange(Number(value));
      },
      clearValue: () => {
        setSelected(0);
      },
    });
  }, [fieldName, registerField, name, selected, handleOnTypeChange]);

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={name}
          name={name}
          {...rest}
          onChange={handleChange}
          value={selected}
        >
          {options &&
            options.map((option, index) => (
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
                key={index}
              />
            ))}
        </RadioGroup>
      </FormControl>
      {error && (
        <span style={{ color: '#ff0000', display: 'block' }}>{error}</span>
      )}
    </>
  );
}

export default RadioInputGroup;

RadioInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTypeChange: PropTypes.func,
};
