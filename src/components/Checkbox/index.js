import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Container } from './styles';

const CheckboxInput = ({ name, options, label, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [], error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs
          .filter((ref) => ref.checked)
          .map((ref) => Number(ref.value));
      },
      clearValue: (refs) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          if (values.filter((value) => value.id === Number(ref.id))[0]) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <>
      <label>{label}</label>
      <Container>
        <ul>
          {options.map((option, index) => (
            <li key={option.id}>
              <img src={option.url} alt={option.label} />
              {option.label}
              <input
                defaultChecked={defaultValue.find((dv) => dv === option.id)}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={option.value}
                type="checkbox"
                id={option.id}
                {...rest}
              />
            </li>
          ))}
        </ul>
      </Container>
      {error && <span>{error}</span>}
    </>
  );
};

export default CheckboxInput;

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.shape.isRequired,
  label: PropTypes.string,
};

CheckboxInput.defaultProps = {
  label: '',
};
