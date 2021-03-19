import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { Editor } from '@tinymce/tinymce-react';

function HtmlEditor({ name }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);
  const [html, setHtml] = useState(null);
  useEffect(() => {
    // const path = rest.type === 'checkbox' ? 'checked' : 'value';
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
    <>
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
          if (inputRef.current) {
            inputRef.current.editor.setContent(html);
          }
        }}
      />
    </>
  );
}

export default HtmlEditor;

HtmlEditor.propTypes = {
  name: PropTypes.string.isRequired,
};
