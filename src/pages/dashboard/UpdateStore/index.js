import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import {
  Container,
  ProductImage,
  // SubContainer,
  ProductsArea,
} from './styles';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Img from '../../../components/Img';

import { Table, Td, Th, Tr } from '../../../components/Table';

import LoadingIcon from '../../../components/LoadingIcon';

import { updateStoreRequest } from '../../../store/modules/store/actions';

function UpdateStore({ match }) {
  const id = Number(match.params.id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});

  const formRef = useRef(null);
  useEffect(() => {
    async function getStore() {
      try {
        const response = await api.get(`stores/${id}`);
        setLoading(false);
        setStore(response.data);
        formRef.current.setData(response.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações da loja');
        setLoading(false);
      }
    }

    getStore();
  }, []);
  async function submitHandle(data) {
    console.tron.log(data);

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
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(updateStoreRequest(id, data));
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
    <Container>
      <Form ref={formRef} onSubmit={submitHandle}>
        <Typography align="center" variant="h5">
          Editar
        </Typography>

        {loading ? (
          <LoadingIcon />
        ) : (
          <>
            <Grid container xs={12} justify="space-around">
              <Grid item xs={12} md={5}>
                <Img name="logo" submitName="logoId" label="Logo:" />
              </Grid>
              <Grid item xs={12} md={5}>
                <Img
                  name="cover"
                  submitName="coverId"
                  label="Imagem da campanha:"
                />
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
                <Input
                  name="city"
                  placeholder="Insira a cidade"
                  label="Cidade:"
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
              </Grid>

              <Box m={2} width="100%" textAlign="right">
                <Button variant="contained" color="primary" type="submit">
                  Salvar
                </Button>
              </Box>
            </Grid>
            <ProductsArea>
              <label> Produtos</label>
              <Table>
                <Tr>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Preço</Th>
                  <Th>Destaque</Th>
                </Tr>
                {store &&
                  store.products &&
                  store.products.map((product) => (
                    <Tr key={product.id}>
                      <Td>
                        <ProductImage
                          src={product.image.url}
                          alt={product.name}
                        />
                      </Td>
                      <Td>
                        <Link to={`/updateproduct/${product.id}`}>
                          {product.name}
                        </Link>
                      </Td>
                      <Td>{product.price}</Td>
                      <Td>
                        {product.featured ? (
                          <FaCheckSquare color="#4d88ff" />
                        ) : (
                          <FaSquare color="#dbdbdb" />
                        )}
                      </Td>
                    </Tr>
                  ))}
              </Table>
            </ProductsArea>
          </>
        )}
      </Form>
    </Container>
  );
}

export default UpdateStore;

UpdateStore.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
