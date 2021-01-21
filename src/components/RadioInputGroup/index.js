import React, { useRef, useEffect, useState } from 'react';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

function RadioInputGroup({ name, label, options, ...rest }) {
  const radioRef = useRef(null);

  const { fieldName, registerField, error } = useField(name);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    registerField({
      name,
      ref: radioRef.current,
      getValue: () => {
        return selected;
      },
      setValue: (_, value) => {
        setSelected(Number(value));
      },
      clearValue: () => {
        setSelected(0);
      },
    });
  }, [fieldName, registerField, name, selected]);

  function handleChange(event) {
    setSelected(Number(event.target.value));
  }
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
            options.map((option) => (
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
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
  options: PropTypes.arrayOf(PropTypes.element).isRequired,
};
