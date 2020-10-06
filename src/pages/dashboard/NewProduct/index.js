import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Img from '../../../components/Img';

import { Container, FormHeader } from './styles';
import { SaveButton } from '../../../components/Buttons';
import { addProductRequest } from '../../../store/modules/product/actions';
import Checkbox from '../../../components/Checkbox';
import api from '../../../services/api';

function NewProduct() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [choiceOptions, setChoiceOptions] = useState([]);
  useEffect(() => {
    async function getStores() {
      try {
        const response = await api.get('stores');
        const options = response.data.map((store) => ({
          id: store.id,
          value: store.id,
          label: store.name,
          url: store.logo ? store.logo.url : null,
        }));
        setChoiceOptions(options);
      } catch (err) {
        toast.error('Houve um erro ao buscar as lojas');
      }
    }
    getStores();
  }, []);

  async function submitHandle(data) {
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
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.tron.log(data);
      dispatch(addProductRequest(data));
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
        <FormHeader>
          <h2>Novo Produto</h2>
          <div>
            <Input type="checkbox" name="featured" label="Destaque" />
          </div>
        </FormHeader>
        <Img name="image" submitName="fileId" label="Imagem:" />

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
        {/* <ItemsChoice
          name="stores"
          label="Selecione as lojas"
          options={choiceOptions}
        /> */}
        <Checkbox name="stores" options={choiceOptions} />

        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Container>
  );
}

export default NewProduct;
