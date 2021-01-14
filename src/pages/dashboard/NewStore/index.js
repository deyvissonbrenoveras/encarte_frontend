import React, { useRef } from 'react';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import Input from '../../../components/Input';
import Img from '../../../components/Img';

import { addStoreRequest } from '../../../store/modules/store/actions';

function NewStore() {
  const dispatch = useDispatch();
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(50, 'Máximo de 50 caracteres')
          .required('O nome é obrigatório'),
        url: Yup.string()
          .max(50, 'Máximo de 50 caracteres')
          .required('A URL é obrigatória'),
        address: Yup.string().max(100, 'Máximo de 100 caracteres'),
        city: Yup.string().max(100, 'Máximo de 100 caracteres'),
        phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
        whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        logoId: Yup.number().required('Selecione uma logo'),
        coverId: Yup.number(),
        shelfLife: Yup.date('Data inválida').nullable(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(
        addStoreRequest(data, function successCb() {
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
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Typography align="center" variant="h5">
        Nova loja
      </Typography>
      <Grid container justify="space-around">
        <Grid item xs={12} md={5}>
          <Img name="logo" submitName="logoId" label="Logo:" />
        </Grid>
        <Grid item xs={12} md={5}>
          <Img name="cover" submitName="coverId" label="Imagem da campanha:" />
        </Grid>
        <Grid item xs={12} sm={6} lg={5}>
          <Input
            name="name"
            placeholder="Insira o nome da loja"
            label="Nome:"
          />
          <Input name="url" placeholder="Insira a URL" label="URL:" />
          <Input
            name="address"
            placeholder="Insira o endereço"
            label="Endereço:"
          />
          <Input name="city" placeholder="Insira a cidade" label="Cidade:" />
        </Grid>

        <Grid item xs={12} sm={6} lg={5}>
          <Input
            name="phone"
            placeholder="Insira o telefone"
            label="Telefone:"
          />

          <Input
            name="whatsapp"
            placeholder="Insira o Whatsapp"
            label="Whatsapp:"
          />
          <Input
            name="instagram"
            placeholder="Insira o Instagram"
            label="Instagram:"
          />
          <Input
            name="facebook"
            placeholder="Insira o Facebook"
            label="Facebook:"
          />
          <Input
            name="shelfLife"
            label="Data de validade do e-ncarte:"
            type="date"
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

export default NewStore;
