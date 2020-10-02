import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import { Container } from './styles';

function ItemsChoice({ name, label, options }) {
  const { registerField, fieldName, defaultValue, error } = useField(name);
  const ref = useRef([]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValue || []);

  function handleChange(id) {
    const toggleSelected = [...selectedOptions];
    const index = toggleSelected.indexOf(id);
    if (index === -1) {
      toggleSelected.push(id);
    } else {
      toggleSelected.splice(index, 1);
    }
    setSelectedOptions(toggleSelected);
  }
  function parseValue(elementRef) {
    console.tron.log(elementRef);
    return selectedOptions;
  }
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: '',
      parseValue,
    });
  }, [selectedOptions, fieldName]);
  return (
    <>
      <label>{label}</label>
      <Container>
        <ul>
          {options.map((option) => (
            <li key={option.id}>
              <img src={option.url} alt={option.label} />
              {option.label}
              <input
                type="checkbox"
                id={option.id}
                value={option.id}
                onChange={() => handleChange(option.id)}
                defaultChecked={selectedOptions.includes(option.id)}
              />
            </li>
          ))}
        </ul>
      </Container>
      {error && <span>{error}</span>}
    </>
  );
}

export default ItemsChoice;

ItemsChoice.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string,
      label: PropTypes.string.isRequired,
    })
  ),
};

ItemsChoice.defaultProps = {
  options: [],
};
