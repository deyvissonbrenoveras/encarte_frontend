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
          return null;
        }
        return ref.state.value.value;
      },
      clearValue: (ref) => {
        ref.select.setValue(null);
      },
      setValue: (ref, value) => {
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

// import React, { useRef, useEffect } from 'react';
// import { useField } from '@unform/core';
// import ReactSelect from 'react-select';
// import PropTypes from 'prop-types';
// import { TextField } from '@material-ui/core';
// import { Autocomplete } from '@material-ui/lab';

// const SelectInput = ({ name, label, options, ...rest }) => {
//   const selectRef = useRef(null);
//   const { fieldName, registerField, error } = useField(name);

//   function register(event, newValue) {
//     console.log(newValue);
//     registerField({
//       name: fieldName,
//       ref: selectRef.current,
//       clearValue: (ref) => {
//         ref.selectedValue = '';
//       },
//       getValue: (ref) => {
//         return ref.selectedValue;
//       },
//       setValue: (ref, value) => {
//         ref.selectedValue = value;
//         ref.value = 'Usuário';
//         console.log(ref);
//       },
//     });
//   }

//   useEffect(register, [fieldName, registerField]);

//   return (
//     <>
//       <Autocomplete
//         id={name}
//         options={options}
//         fullWidth
//         getOptionLabel={(option) => option.label}
//         onChange={(event, option) => {
//           selectRef.current.selectedValue = option ? option.value : null;
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             inputRef={selectRef}
//             label={label}
//             variant="outlined"
//           />
//         )}
//       />
//       <span color="#ff0000">{error}</span>
//     </>
//   );
// };
// export default SelectInput;

// SelectInput.propTypes = {
//   name: PropTypes.string.isRequired,
// };
