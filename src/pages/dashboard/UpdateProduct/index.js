import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import Input from '../../../components/Input';
import CheckboxInput from '../../../components/CheckboxInput';
import Img from '../../../components/Img';
import Checkbox from '../../../components/Checkbox';
import Select from '../../../components/Select';

import { updateProductRequest } from '../../../store/modules/product/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import api from '../../../services/api';

function UpdateProduct({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [stores, setStores] = useState([]);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const storesResponse = await api.get('stores');
        const options = storesResponse.data.map((store) => ({
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

        const productResponse = await api.get(`products/${id}`);
        setLoadingProduct(false);
        formRef.current.setData(productResponse.data);
        setStores(productResponse.data.stores);
      } catch (err) {
        toast.error('Houve um erro ao carregar o usuário');
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
        categoryId: Yup.number().positive().nullable(true),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const productStores = stores.map((store) => Number(store.id));

      const removeStores = productStores.filter(
        (store) => !data.stores.includes(store)
      );

      const addStores = data.stores.filter((store) => {
        return !productStores.includes(store);
      });
      dispatch(updateProductRequest(id, data, removeStores, addStores));
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
      <Typography variant="h5">Editar Produto</Typography>
      {loadingProduct && <LoadingIcon />}

      <Grid container justify="space-around" xs={12}>
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
    </Form>
  );
}

export default UpdateProduct;

UpdateProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
