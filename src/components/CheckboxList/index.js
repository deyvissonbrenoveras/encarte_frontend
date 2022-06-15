import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { TextField } from '@material-ui/core';
import { Container } from './styles';

const CheckboxList = ({
  name,
  options,
  label,
  idFieldName,
  numberFieldName,
  numberFieldLabel,
  numberFieldPlaceholder,
  hideAllPriceInputs,
  disableCheckBox,
  ...rest
}) => {
  const inputRefs = useRef([]);
  const priceRefs = useRef([]);

  const { fieldName, registerField, defaultValue = [], error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        const mappedValue = refs
          .filter((ref) => ref.checked)
          .map((ref) => {
            const value = { storeId: Number(ref.value), customPrice: null };
            if (priceRefs.current[refs.indexOf(ref)]) {
              value.customPrice = priceRefs.current[refs.indexOf(ref)].value;
            }
            return value;
          });
        return mappedValue;
      },
      clearValue: (refs) => {
        refs
          .filter((ref) => ref.checked)
          .forEach((ref) => (priceRefs.current[refs.indexOf(ref)].value = ''));
      },
      setValue: (refs, values) => {
        refs.forEach((ref) => {
          const filteredValue = values.filter(
            (value) => value.id === Number(ref.id)
          )[0];
          if (filteredValue && !hideAllPriceInputs) {
            ref.checked = true;
            const index = refs.indexOf(ref);
            if (priceRefs.current[index]) {
              priceRefs.current[index].value =
                filteredValue.Products_Stores.customPrice;
            }
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField, hideAllPriceInputs]);

  return (
    <>
      <label>{label}</label>
      <Container>
        <ul>
          {options.map((option, index) => (
            <li key={option.id}>
              <img src={option.url} alt={option.label} />
              <div>
                <label>{option.label}</label>
                <label>
                  {!hideAllPriceInputs && (
                    <TextField
                      defaultValue={option.customPrice}
                      type="number"
                      placeholder={numberFieldPlaceholder}
                      size="small"
                      inputRef={(ref) => (priceRefs.current[index] = ref)}
                      inputProps={{ step: 'any', min: 0.01 }}
                      error={error}
                      onChange={({ target }) => {
                        if (target.value) {
                          inputRefs.current[index].checked = true;
                        }
                      }}
                    />
                  )}
                </label>
              </div>
              <input
                defaultChecked={defaultValue.find((dv) => dv === option.id)}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                disabled={disableCheckBox}
                value={option.value}
                type="checkbox"
                id={option.id}
                {...rest}
              />
            </li>
          ))}
        </ul>
        {error && <span>{error}</span>}
      </Container>
    </>
  );
};

export default CheckboxList;

CheckboxList.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
};

CheckboxList.defaultProps = {
  label: '',
};
