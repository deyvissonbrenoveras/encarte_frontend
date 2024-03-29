import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { Editor } from '@tinymce/tinymce-react';

import useStyles from './styles';

function HtmlEditor({ name, label }) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);
  const [html, setHtml] = useState(null);
  useEffect(() => {
    registerField({
      name,
      ref: inputRef.current,
      getValue: (ref) => {
        return ref.editor.getContent();
      },
      clearValue: (ref) => {
        ref.editor.setContent('');
      },
      setValue: (ref, value) => {
        if (value) {
          setHtml(value);
        }
      },
    });
  }, [fieldName, registerField, name]);
  return (
    <div>
      <label>{label}</label>
      <div className={classes.htmlEditor}>
        <Editor
          apiKey="vnfij7wr5ewnmbkqvjmkdefw0hy651yx4unub1km04zhhug0"
          ref={inputRef}
          init={{
            height: 300,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            branding: false,
          }}
          onInit={() => {
            inputRef.current.editor.setContent(html !== null ? html : '');
          }}
        />
      </div>
    </div>
  );
}

export default HtmlEditor;

HtmlEditor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
