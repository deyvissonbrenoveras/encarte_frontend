import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import Input from '../../../components/Input';
import CheckboxInput from '../../../components/CheckboxInput';
import Img from '../../../components/Img';
import Textarea from '../../../components/Textarea';
import Checkbox from '../../../components/Checkbox';

import { Container, FormHeader } from './styles';
import { SaveButton } from '../../../components/Buttons';

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
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const productStores = stores.map((store) => Number(store.id));

      const removeStores = productStores.filter(
        (store) => !data.stores.includes(store)
      );
      console.tron.log(productStores);

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
    <>
      {loadingProduct ? <LoadingIcon /> : null}

      <Container>
        <Form
          // schema={schema}
          ref={formRef}
          onSubmit={submitHandle}
        >
          <FormHeader>
            <h2>Novo Produto</h2>
            <CheckboxInput name="featured" label="Destaque" />
          </FormHeader>
          <Img name="image" submitName="fileId" label="Imagem:" />
          <Input
            name="name"
            placeholder="Insira o nome do produto"
            label="Nome: "
          />
          <Textarea
            name="description"
            placeholder="Insira a descrição"
            label="Descrição:"
          />
          <Input
            type="number"
            step="any"
            name="price"
            placeholder="Insira o preço"
            label="Preço:"
          />
          <Checkbox name="stores" options={choiceOptions} />
          <SaveButton type="submit">Salvar</SaveButton>
        </Form>
      </Container>
    </>
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
