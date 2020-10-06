import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        console.log(ref);
        const option = ref.props.options.filter(
          (opt) => opt.value === value
        )[0];
        ref.select.setValue(option);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <ReactSelect
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
};
export default Select;

Select.propTypes = {
  name: PropTypes.string.isRequired,
};
