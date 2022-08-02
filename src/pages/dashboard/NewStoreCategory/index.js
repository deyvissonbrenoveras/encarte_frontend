import React, { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import Input from '../../../components/Input';

import { useHistory } from "react-router-dom"

import { toast } from 'react-toastify';
import api from '../../../services/api';

function NewStore() {
  let history = useHistory()
  const formRef = useRef();

  async function handleSubmit(data) {
    try {
      const response = await api.post('/store-categories', data);
      toast.success('Categoria adicionada com sucesso!');
      history.goBack()
    } catch (err) {
      toast.error('Houve um erro ao inserir categoria.');
    }
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Typography align="left" variant="h5">
        Adicionar nova categoria
      </Typography>
      <Grid
        container
        direction="column"
      >
        <Grid
          container
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          style={{ width: '100%' }}
        >
          <div style={{ width: '48%' }}>
            <Input
              name="name"
              placeholder="Insira o nome da categoria"
              label="Nome:"
            />
          </div>
        </Grid>



        <Box p={2} width="100%" textAlign="right">
          <Button variant="contained" color="primary" type="submit">
            Adicionar categoria
          </Button>
        </Box>
      </Grid>
    </Form>
  );
}

export default NewStore;
