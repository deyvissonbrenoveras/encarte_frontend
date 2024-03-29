import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import useStyles from './styles';
import { useField } from '@unform/core';
import { ClickAwayListener } from '@material-ui/core';

function ColorPicker({ name, label, initialColor = '#fff', readOnly }) {
  const pickerRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  const classes = useStyles({ showPicker });

  useEffect(() => {
    registerField({
      name,
      ref: pickerRef.current,
      getValue: (ref) => {
        return ref.props.color;
      },
      setValue: (ref, value) => {
        setColor(value);
      },
    });
  }, [fieldName, registerField, name]);

  function handleChangeComplete(color) {
    setColor(color.hex);
  }

  function handleClick() {
    if (!readOnly) {
      setTimeout(() => {
        setShowPicker(!showPicker);
      }, 100);
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.label}>{label}</div>
        <button
          className={classes.button}
          style={{ background: color }}
          type="button"
          onClick={handleClick}
        ></button>
      </div>
      <ClickAwayListener
        onClickAway={() => {
          if (showPicker) {
            setShowPicker(false);
          }
        }}
      >
        <SketchPicker
          color={color}
          onChange={handleChangeComplete}
          disableAlpha
          ref={pickerRef}
          display={false}
          className={classes.colorPicker}
          onClick={(e) => {}}
        />
      </ClickAwayListener>

      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}

export default ColorPicker;
