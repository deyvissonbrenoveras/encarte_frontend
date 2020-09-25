import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';

import {
  loadStoresRequest,
  updateStoreRequest,
} from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import ImageInput from '../../../components/ImageInput';

import { Container, ImageInputs } from './styles';
import { SaveButton } from '../../../components/Buttons';

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
  const { loading, stores } = useSelector((state) => state.store);
  const id = Number(match.params.id);
  const store = stores.filter((str) => str.id === id)[0];

  useEffect(() => {
    dispatch(loadStoresRequest());
  }, []);

  function submitHandle(data) {
    dispatch(updateStoreRequest(id, data));
  }
  return (
    <Container>
      <h2>Nova loja</h2>
      {loading ? (
        <LoadingIcon />
      ) : (
        store && (
          <Form initialData={store} onSubmit={submitHandle} schema={schema}>
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
        )
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
