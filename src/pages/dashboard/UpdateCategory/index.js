import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';

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
    <Form ref={formRef} onSubmit={submitHandle}>
      <Typography variant="h5">Editar categoria</Typography>
      <Grid container>
        <Grid item xs={12} md={4}>
          <Input
            name="name"
            placeholder="Insira o nome da categoria"
            label="Categoria:"
          />
        </Grid>
        <Box m={2} width="100%" textAlign="right">
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </Box>
      </Grid>
    </Form>
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
