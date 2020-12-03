import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import Input from '../../../components/Input';
import CheckboxInput from '../../../components/CheckboxInput';
// import Textarea from '../../../components/Textarea';
import Img from '../../../components/Img';

// import { Container, FormHeader } from './styles';
// import { SaveButton } from '../../../components/Buttons';
import { addProductRequest } from '../../../store/modules/product/actions';
import Checkbox from '../../../components/Checkbox';
import Select from '../../../components/Select';
import api from '../../../services/api';
import LoadingIcon from '../../../components/LoadingIcon';

function NewProduct() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('stores');
        const options = response.data.map((store) => ({
          id: store.id,
          value: store.id,
          label: store.name,
          url: store.logo ? store.logo.url : null,
        }));
        setChoiceOptions(options);
        const categoriesResponse = await api.get('categories');
        setCategoryOptions(
          categoriesResponse.data.map((category) => ({
            value: category.id,
            label: category.name,
          }))
        );
        setLoading(false);
      } catch (err) {
        toast.error('Houve um erro ao buscar as lojas');
      }
    }
    getData();
  }, []);

  async function submitHandle(data) {
    console.tron.log(data);
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        fileId: Yup.number().required('Selecione uma imagem para o produto'),
        name: Yup.string()
          .max(100, 'Máximo de 100 caracteres')
          .required('O nome é obrigatório'),
        description: Yup.string().max(1000, 'Máximo de 1000 caracteres'),
        price: Yup.number('Preço inválido')
          .typeError('Preço inválido')
          .positive('Números negativos não são permitidos')
          .required('O preço é obrigatório'),
        featured: Yup.boolean(),
        stores: Yup.array().min(1, 'Selecione pelo menos uma loja'),
        categoryId: Yup.number().positive().nullable(true),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(
        addProductRequest(data, function successCb() {
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
      <Typography variant="h5">Novo Produto</Typography>

      {loading ? (
        <LoadingIcon />
      ) : (
        <Grid container justify="space-around">
          <Grid item xs={12} md={4}>
            <Img name="image" submitName="fileId" label="Imagem:" />
            <CheckboxInput name="featured" label="Destaque" />

            <Input
              name="name"
              placeholder="Insira o nome do produto"
              label="Nome:"
            />
            <Input
              type="number"
              name="price"
              placeholder="Insira o preço"
              label="Preço:"
            />
            <Input
              name="description"
              placeholder="Insira a descrição"
              label="Descrição:"
              multiline
              rows={4}
            />
            <Select name="categoryId" options={categoryOptions} isClearable />
          </Grid>
          <Grid item xs={12} md={7}>
            <Checkbox name="stores" options={choiceOptions} label="Lojas" />
          </Grid>
          <Box m={2} width="100%" textAlign="right">
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Grid>
      )}
    </Form>
  );
}

export default NewProduct;
