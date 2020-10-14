import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import { SaveButton } from '../../../components/Buttons';

import { updateCategoryRequest } from '../../../store/modules/category/actions';
import api from '../../../services/api';
// import { Container } from './styles';

function UpdateCategory({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const formRef = useRef(null);
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`categories/${id}`);
        formRef.current.setData(response.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar a categoria');
      }
    }
    getData();
  }, []);
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
      dispatch(updateCategoryRequest(id, data));
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
      <h2>Editar categoria</h2>
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

export default UpdateCategory;

UpdateCategory.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
