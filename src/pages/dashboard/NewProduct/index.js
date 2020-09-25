import React from 'react';
import { useDispatch } from 'react-redux';

import { Form, Input, Textarea } from '@rocketseat/unform';
import ImageInput from '../../../components/ImageInput';
import ChooseStores from '../../../components/ChooseStores';

import { Container } from './styles';
import { SaveButton } from '../../../components/Buttons';
import { addProductRequest } from '../../../store/modules/product/actions';

function NewProduct() {
  const dispatch = useDispatch();

  function submitHandle(data) {
    console.tron.log(data);
    dispatch(addProductRequest(data));
  }

  return (
    <Container>
      <h2>Novo Produto</h2>
      <Form onSubmit={submitHandle}>
        <ImageInput inputName="fileId" inputId="file" inputLabel="Imagem:" />

        <label htmlFor="name">Nome:</label>
        <Input name="name" placeholder="Insira o nome do produto" />

        <label htmlFor="description">Descrição:</label>
        <Textarea name="description" placeholder="Insira a descrição" />

        <label htmlFor="price">Preço:</label>
        <Input type="number" name="price" placeholder="Insira o preço" />
        <ChooseStores />
        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Container>
  );
}

export default NewProduct;
