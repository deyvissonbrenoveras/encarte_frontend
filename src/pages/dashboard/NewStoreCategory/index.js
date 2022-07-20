import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { addStoreRequest } from '../../../store/modules/store/actions';

function NewStore() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [typeCategory, setTypeCategory] = useState('');


  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      console.log('form data', data);
      
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

  const options = [
    { value: 'city', label: 'Cidade' },
    { value: 'state', label: 'Estado' },
  ];

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
          <div style={{ width: '50%' }}>
            <Select
              name="type"
              placeholder="Tipo de categoria: "
              options={options}
              onChange={(event) => {
                setTypeCategory(event.value);
              }}
              isClearable
            />
          </div>

          <div style={{ width: '48%' }}>
            <Input
              name="uf"
              placeholder="Ex.: PB"
              label="UF:"
              disabled={typeCategory != 'state'}
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
