import React, { useRef } from 'react';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Input from '../../../components/Input';

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
      dispatch(
        addCategoryRequest(data, function successCb() {
          formRef.current.reset();
        })
      );
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
      <Typography variant="h5">Nova categoria</Typography>
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

export default NewCategory;
