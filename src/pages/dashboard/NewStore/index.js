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
  const [categories, setCategories] = useState([]);

  function normalizedCitiesOptions(cities) {
    const cityOptions = cities.map((city) => ({
      value: city.id,
      label: `${city.name} - ${city.state.uf}`,
    }));

    setCities(cityOptions);
  }

  function normalizedCategoriesOptions(categories) {
    const categoriesOptions = categories.map((category) => ({
      value: category.id,
      label: `${category.name}`,
    }));
    setCategories(categoriesOptions);
  }

  async function getCities() {
    async function execGetCities() {
      try {
        Promise.all([api.get('locations/cities'), api.get('/store-categories')]).then(res => {
          normalizedCitiesOptions(res[0].data);
          normalizedCategoriesOptions(res[1].data);
        });

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
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(50, 'Máximo de 50 caracteres')
          .required('O nome é obrigatório'),
        url: Yup.string()
          .max(50, 'Máximo de 50 caracteres')
          .required('A URL é obrigatória'),
        address: Yup.string().max(100, 'Máximo de 100 caracteres'),
        cityId: Yup.number()
          .positive()
          .required('A cidade é obrigatória')
          .typeError('A cidade é obrigatória'),
        storeCategoryId: Yup.number()
          .positive()
          .required('A categoria é obrigatória')
          .typeError('A categoria é obrigatória'),
        phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
        whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        logoId: Yup.number()
          .required('Selecione uma logo')
          .typeError('Selecione uma logo'),
        coverId: Yup.number().nullable(),
        secondaryCoverId: Yup.number().nullable(),
        shelfLifeStart: Yup.date('Data inválida').nullable(),
        shelfLifeEnd: Yup.date('Data inválida').nullable(),
        primaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
        secondaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
        tertiaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
        quaternaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
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
  return loading ? (
    <LoadingIcon />
  ) : (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Typography align="center" variant="h5">
        Nova loja
      </Typography>
      <Grid container justify="space-around">
        <Grid container justify="space-around" style={{ marginBottom: 20 }}>
          <Grid item xs={12} lg={3} style={{ margin: 10 }}>
            <Img name="logo" submitName="logoId" label="Logo:" />
          </Grid>
          <Grid item xs={12} lg={3} style={{ margin: 10 }}>
            <Img
              name="cover"
              submitName="coverId"
              label="Imagem da campanha:"
              showRemoveButton
            />
          </Grid>
          <Grid item xs={12} lg={3} style={{ margin: 10 }}>
            <Img
              name="secondaryCover"
              submitName="secondaryCoverId"
              label="Imagem secundária da campanha:"
              showRemoveButton
            />
          </Grid>
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
          <Select
            name="cityId"
            placeholder="Cidade:"
            options={cities}
            isClearable
          />
          <Select
            name="storeCategoryId"
            placeholder="Categoria:"
            options={categories}
            isClearable
          />

          <ColorPicker
            name="primaryColor"
            label="Selecione a cor primária:"
            initialColor="#1D53A5"
          />
          <ColorPicker
            name="secondaryColor"
            label="Selecione a cor secundária:"
            initialColor="#B4B4B4"
          />
          <ColorPicker
            name="tertiaryColor"
            label="Selecione a cor terciária:"
            initialColor="#000"
          />
          <ColorPicker
            name="quaternaryColor"
            label="Selecione a cor quaternária:"
            initialColor="#fff"
          />
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
            name="shelfLifeStart"
            label="Data início da validade do e-ncarte:"
            type="date"
          />
          <Input
            name="shelfLifeEnd"
            label="Data fim da validade do e-ncarte:"
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
