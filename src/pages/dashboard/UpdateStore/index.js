import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { updateStoreRequest } from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import ImageInput from '../../../components/ImageInput';

import {
  Container,
  ImageInputs,
  ProductImage,
  // SubContainer,
  ProductsArea,
} from './styles';
import { SaveButton } from '../../../components/Buttons';

import api from '../../../services/api';
import { Table, Td, Th, Tr } from '../../../components/Table';

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
  logoId: Yup.number(),
  coverId: Yup.number(),
});

function UpdateStore({ match }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState({});
  const id = Number(match.params.id);

  useEffect(() => {
    async function getStore() {
      try {
        const response = await api.get(`stores/${id}`);

        setInitialData(response.data);

        setLoading(false);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações da loja');
        setLoading(false);
      }
    }
    getStore();
  }, []);

  function submitHandle(data) {
    dispatch(updateStoreRequest(id, data));
  }
  return (
    <Container>
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          <Form
            initialData={initialData}
            onSubmit={submitHandle}
            schema={schema}
          >
            <h2>Editar loja</h2>

            <ImageInputs>
              <ImageInput
                inputName="logoId"
                inputId="logo"
                inputLabel="Logo:"
              />
              <ImageInput
                inputName="coverId"
                inputId="cover"
                inputLabel="imagem da campanha:"
              />
            </ImageInputs>

            <label htmlFor="name">Nome:</label>
            <Input name="name" placeholder="Insira o nome da loja" />

            <label htmlFor="url">URL:</label>
            <Input name="url" placeholder="Insira a URL" />

            <label htmlFor="address">Endereço:</label>
            <Input name="address" placeholder="Insira o endereço" />

            <label htmlFor="city">Cidade:</label>
            <Input name="city" placeholder="Insira a cidade" />

            <label htmlFor="phone">Telefone:</label>
            <Input name="phone" placeholder="Insira o telefone" />

            <label htmlFor="whatsapp">Whatsapp:</label>
            <Input name="whatsapp" placeholder="Insira o Whatsapp" />

            <label htmlFor="instagram">Instagram:</label>
            <Input name="instagram" placeholder="Insira o Instagram" />

            <label htmlFor="facebook">Facebook:</label>
            <Input name="facebook" placeholder="Insira o Facebook" />
            <SaveButton type="submit">Salvar</SaveButton>
          </Form>
          <ProductsArea>
            <label> Produtos</label>
            <Table>
              <Tr>
                <Th>Imagem</Th>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Destaque</Th>
              </Tr>
              {initialData &&
                initialData.products.map((product) => (
                  <Tr>
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
