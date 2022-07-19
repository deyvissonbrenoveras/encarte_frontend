import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import api from '../../../services/api';
import { Form } from '@unform/web';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import Input from '../../../components/Input';
import ColorPicker from '../../../components/ColorPicker';
import Select from '../../../components/Select';
import LoadingIcon from '../../../components/LoadingIcon';
import Img from '../../../components/Img';
import { addStoreRequest } from '../../../store/modules/store/actions';

function NewStore() {
  const dispatch = useDispatch();
  const formRef = useRef();

  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);

  async function getCities(state) {
    async function execGetCities() {
      try {
        const response = await api.get('locations/cities');
        const cityOptions = response.data.map((city) => ({
          value: city.id,
          label: `${city.name} - ${city.state.uf}`,
        }));

        console.log(cityOptions)

        setCities(cityOptions);
        setLoading(false);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações da loja');
        setLoading(false);
      }
    }
    execGetCities();
  }

  useEffect(() => {
    getCities();
  }, []);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

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
  return loading ? (
    <LoadingIcon />
  ) : (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Typography align="center" variant="h5">
        Adicionar nova categoria
      </Typography>
      <Grid container justify="space-around">
        
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
          <Select
            name="cityId"
            placeholder="Cidade:"
            options={cities}
            isClearable
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
