import React, { useRef } from 'react';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { useDispatch } from 'react-redux';
import Input from '../../../components/Input';
import { SaveButton } from '../../../components/Buttons';

import { addCategoryRequest } from '../../../store/modules/category/actions';
// import { Container } from './styles';

function NewCategory() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(100, 'Máximo de 100 caracteres')
          .required('O nome é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(addCategoryRequest(data));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <div>
      <h2>Nova categoria</h2>
      <Form ref={formRef} onSubmit={submitHandle}>
        <Input
          name="name"
          placeholder="Insira o nome da categoria"
          label="Categoria:"
        />
        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </div>
  );
}

export default NewCategory;
