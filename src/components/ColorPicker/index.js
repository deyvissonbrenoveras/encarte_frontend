import React, { useState, useEffect, useRef } from 'react';
import { SketchPicker } from 'react-color';
import useStyles from './styles';
import { useField } from '@unform/core';
import { ClickAwayListener, Portal } from '@material-ui/core';

function ColorPicker({ name, label }) {
  const pickerRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  const [color, setColor] = useState('#fff');
  const [showPicker, setShowPicker] = useState(false);

  const classes = useStyles({ showPicker });

  useEffect(() => {
    // const path = rest.type === 'checkbox' ? 'checked' : 'value';
    registerField({
      name,
      ref: pickerRef.current,
      getValue: (ref) => {
        return ref.props.color;
      },
      clearValue: (ref, value) => {
        setColor('#fff');
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
    setTimeout(() => {
      setShowPicker(!showPicker);
    }, 100);
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
          onClick={(e) => {
            console.log(e.target);
          }}
        />
      </ClickAwayListener>

      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}

export default ColorPicker;