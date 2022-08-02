import React, { useRef, useEffect, useState } from 'react';


import { Form } from '@unform/web';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import Input from '../../../components/Input';

import { useHistory, useParams } from "react-router-dom"

import { toast } from 'react-toastify';
import api from '../../../services/api';

function UpdateStoreCategory() {
  let history = useHistory();
  const formRef = useRef();

  let { id } = useParams();

  const [category, setCategory] = useState({});

  async function handleSubmit(data) {
    try {
      await api.put(`/store-categories/${id}`, data);
      toast.success('Categoria editada com sucesso!');
      history.goBack()
    } catch (err) {
      toast.error('Houve um erro ao editar a categoria.');
    }
  }

  useEffect(() => {
    async function fetch() {
        const response = await api.get(`/store-categories/${id}`);
        setCategory(response.data.name);
    }
    fetch();
  }, [id])

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Typography align="left" variant="h5">
        Editar categoria
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
            type="text"
              name="name"
              placeholder="Insira o nome da categoria"
              value={category}
              onChange={({ target }) => setCategory(target.value)}
            />
          </div>
        </Grid>



        <Box p={2} width="100%" textAlign="right">
          <Button variant="contained" color="primary" type="submit">
            Editar categoria
          </Button>
        </Box>
      </Grid>
    </Form>
  );
}

export default UpdateStoreCategory;
