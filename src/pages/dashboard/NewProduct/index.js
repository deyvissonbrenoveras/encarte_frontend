import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { Form, Input, Textarea, Check } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import ImageInput from '../../../components/ImageInput';

import { Container, FormHeader } from './styles';
import { SaveButton } from '../../../components/Buttons';
import { addProductRequest } from '../../../store/modules/product/actions';
import ItemsChoice from '../../../components/ItemsChoice';
import api from '../../../services/api';

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
});

function NewProduct() {
  const dispatch = useDispatch();
  const [choiceOptions, setChoiceOptions] = useState([]);
  useEffect(() => {
    async function getStores() {
      try {
        const response = await api.get('stores');
        const options = response.data.map((store) => ({
          id: store.id,
          label: store.name,
          url: store.logo.url,
        }));
        setChoiceOptions(options);
      } catch (err) {
        toast.error('Houve um erro ao buscar as lojas');
      }
    }
    getStores();
  }, []);

  function submitHandle(data) {
    dispatch(addProductRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={submitHandle}>
        <FormHeader>
          <h2>Novo Produto</h2>
          <div>
            <Check name="featured" label="Destaque" />
          </div>
        </FormHeader>
        <ImageInput inputName="fileId" inputId="fileId" inputLabel="Imagem:" />

        <label htmlFor="name">Nome:</label>
        <Input name="name" placeholder="Insira o nome do produto" />

        <label htmlFor="description">Descrição:</label>
        <Textarea name="description" placeholder="Insira a descrição" />

        <label htmlFor="price">Preço:</label>
        <Input
          type="number"
          step="any"
          name="price"
          placeholder="Insira o preço"
        />
        <ItemsChoice
          name="stores"
          label="Selecione as lojas"
          options={choiceOptions}
        />
        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Container>
  );
}

export default NewProduct;
