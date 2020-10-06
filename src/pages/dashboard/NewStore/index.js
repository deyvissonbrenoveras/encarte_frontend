import React, { useRef } from 'react';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { Form } from '@unform/web';
import Input from '../../../components/Input';
import Img from '../../../components/Img';

import { Container, ImageInputs } from './styles';

import { addStoreRequest } from '../../../store/modules/store/actions';
import { SaveButton } from '../../../components/Buttons';

function NewStore() {
  const dispatch = useDispatch();
  const formRef = useRef();

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

      dispatch(addStoreRequest(data));
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
      <h2>Nova loja</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ImageInputs>
          <Img name="logo" submitName="logoId" label="Logo:" />
          <Img name="cover" submitName="coverId" label="Imagem da campanha:" />
        </ImageInputs>

        <Input name="name" placeholder="Insira o nome da loja" label="Nome:" />

        <Input name="url" placeholder="Insira a URL" label="URL:" />

        <Input
          name="address"
          placeholder="Insira o endereço"
          label="Endereço:"
        />

        <Input name="city" placeholder="Insira a cidade" label="Cidade:" />

        <Input name="phone" placeholder="Insira o telefone" label="Telefone:" />

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

        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Container>
  );
}

export default NewStore;
