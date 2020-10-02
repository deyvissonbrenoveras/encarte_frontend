import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// import * as Yup from 'yup';

import { Form } from '@unform/web';
import Input from '../../../components/Input';

// import ImageInput from '../../../components/ImageInput';
import Img from '../../../components/Img';
import Textarea from '../../../components/Textarea';
import Checkbox from '../../../components/Checkbox';

import { Container, FormHeader } from './styles';
import { SaveButton } from '../../../components/Buttons';

import {
  updateProductRequest,
  loadRequest,
} from '../../../store/modules/product/actions';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';

// const schema = Yup.object().shape({
//   fileId: Yup.number().required('Selecione uma imagem para o produto'),
//   name: Yup.string()
//     .max(100, 'Máximo de 100 caracteres')
//     .required('O nome é obrigatório'),
//   description: Yup.string().max(1000, 'Máximo de 1000 caracteres'),
//   price: Yup.number('Preço inválido')
//     .typeError('Preço inválido')
//     .positive('Números negativos não são permitidos')
//     .required('O preço é obrigatório'),
//   featured: Yup.boolean(),
//   stores: Yup.array().min(1, 'Selecione pelo menos uma loja'),
// });

function UpdateProduct({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);
  const dispatch = useDispatch();

  // const loading = useSelector((state) => state.product.loading);
  const product = useSelector((state) => state.product.product);
  const stores = useSelector((state) => state.store.stores);

  const productLoading = useSelector((state) => state.product.loading);
  const storeLoading = useSelector((state) => state.store.loading);

  const [choiceOptions, setChoiceOptions] = useState([]);
  // const [initialData, setInitialData] = useState({});

  useEffect(() => {
    dispatch(loadStoresRequest());
  }, []);

  useEffect(() => {
    formRef.current.setData(product);
  }, [product]);

  useEffect(() => {
    const options = stores.map((store) => ({
      id: store.id,
      value: store.id,
      label: store.name,
      url: store.logo.url,
    }));
    setChoiceOptions(options);
    dispatch(loadRequest(id));
  }, [stores]);

  function submitHandle(data) {
    console.tron.log(data);

    const productStores = product.stores.map((store) => store.id);

    const removeStores = productStores.filter(
      (store) => !data.stores.includes(store)
    );

    const addStores = data.stores.filter(
      (store) => !productStores.includes(store)
    );
    dispatch(updateProductRequest(id, data, removeStores, addStores));
  }

  return (
    <Container>
      {productLoading ? (
        <LoadingIcon />
      ) : (
        <Form
          // schema={schema}
          ref={formRef}
          onSubmit={submitHandle}
        >
          <FormHeader>
            <h2>Novo Produto</h2>
            <div>
              <label>Destaque</label>
              <Input type="checkbox" name="featured" />
            </div>
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
          {storeLoading ? (
            <LoadingIcon />
          ) : (
            <Checkbox name="stores" options={choiceOptions} />
          )}
          {/* <ItemsChoice
            name="stores"
            label="Selecione as lojas"
            // options={choiceOptions}
          /> */}
          <SaveButton type="submit">Salvar</SaveButton>
        </Form>
      )}
    </Container>
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
