import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import PriceTypeEnum from '../../../util/PriceTypeEnum';
import Input from '../../../components/Input';
import CheckboxInput from '../../../components/CheckboxInput';
import Img from '../../../components/Img';
import Checkbox from '../../../components/Checkbox';
import CheckboxList from '../../../components/CheckboxList';
import Select from '../../../components/Select';
import RadioGroup from '../../../components/RadioInputGroup';
import { updateProductRequest } from '../../../store/modules/product/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import PrivilegeEnum from '../../../util/PrivilegeEnum';
import api from '../../../services/api';

function UpdateProduct({ match }) {
  const { id } = match.params;
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [stores, setStores] = useState([]);
  const [partners, setPartners] = useState([]);

  const [storeChoiceOptions, setStoreChoiceOptions] = useState([]);
  const [partnerChoiceOptions, setPartnerChoiceOptions] = useState([]);

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [showPriceInput, setShowPriceInput] = useState(true);

  const [userNotAdmin, setUserNotAdmin] = useState(false);
  const userProfile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    setUserNotAdmin(userProfile.privilege > PrivilegeEnum.SYSTEM_ADMINISTRATOR);
  }, [userProfile]);

  const getData = useCallback(async () => {
    try {
      setLoadingProduct(true);
      const storeResponse = await api.get('stores');
      const storeOptions = storeResponse.data.map((store) => ({
        id: store.id,
        value: store.id,
        label: store.name,
        url: store.logo ? store.logo.url : null,
      }));
      setStoreChoiceOptions(storeOptions);

      const partnerResponse = await api.get('partners');
      const partnerOptions = partnerResponse.data.map((partner) => ({
        id: partner.id,
        value: partner.id,
        label: partner.name,
        url: partner.logo ? partner.logo.url : null,
      }));
      setPartnerChoiceOptions(partnerOptions);

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

      setPartners(productResponse.data.partners);
    } catch (err) {
      setLoadingProduct(false);
      toast.error('Houve um erro ao carregar o produto');
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [id, getData]);

  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        fileId: Yup.number().required('Selecione uma imagem para o produto'),
        name: Yup.string()
          .max(100, 'Máximo de 100 caracteres')
          .required('O nome é obrigatório'),
        description: Yup.string().max(1000, 'Máximo de 1000 caracteres'),
        price: Yup.number().when('priceType', {
          is: PriceTypeEnum.SPECIAL_OFFER,
          then: Yup.number().nullable().notRequired(),
          otherwise: Yup.number('Preço inválido')
            .typeError('Preço inválido')
            .positive('Números negativos não são permitidos')
            .required('O preço é obrigatório'),
        }),
        featured: Yup.boolean(),
        categoryId: Yup.number().positive().nullable(true),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const productStores = stores.map((store) => {
        return {
          storeId: Number(store.id),
          customPrice: store.Products_Stores.customPrice,
        };
      });

      const removeStores = productStores
        .map((storeMap) => storeMap.storeId)
        .filter((storeId) => {
          return !data.stores.some((store) => store.storeId === storeId);
        });
      const addStores = data.stores
        .map((store) => {
          return { ...store, customPrice: store.customPrice || null };
        })
        .filter((store) => {
          return !productStores.some(
            (str) =>
              str.storeId === store.storeId &&
              str.customPrice === store.customPrice
          );
        });
      const productPartners = partners.map((partner) => Number(partner.id));

      let removePartners = [];
      let addPartners = [];

      if (!userNotAdmin) {
        removePartners = productPartners.filter(
          (partner) => !data.partners.includes(partner)
        );

        addPartners = data.partners.filter((partner) => {
          return !productPartners.includes(partner);
        });
      }

      dispatch(
        updateProductRequest(
          id,
          data,
          removeStores,
          addStores,
          removePartners,
          addPartners
        )
      );

      getData();
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

      <Grid container justify="space-around">
        <Grid item xs={12} md={4}>
          <Img
            name="image"
            submitName="fileId"
            label="Imagem:"
            readOnly={userNotAdmin}
          />
          <CheckboxInput
            name="featured"
            label="Destaque"
            readOnly={userNotAdmin}
          />

          <Input
            name="name"
            placeholder="Insira o nome do produto"
            label="Nome:"
            readOnly={userNotAdmin}
          />
          <RadioGroup
            name="priceType"
            label="Tipo de preço"
            options={[
              { label: 'Padrão', value: PriceTypeEnum.DEFAULT },
              { label: 'Destacado', value: PriceTypeEnum.FEATURED },
              { label: 'Oferta especial', value: PriceTypeEnum.SPECIAL_OFFER },
            ]}
            readOnly={userNotAdmin}
            onTypeChange={(type) => {
              setShowPriceInput(type !== PriceTypeEnum.SPECIAL_OFFER);
            }}
          />

          {showPriceInput && (
            <Input
              type="number"
              name="price"
              placeholder="Insira o preço"
              label="Preço:"
              readOnly={userNotAdmin}
            />
          )}

          <Input
            name="description"
            placeholder="Insira a descrição"
            label="Descrição:"
            multiline
            rows={4}
            readOnly={userNotAdmin}
          />
          <Select
            name="categoryId"
            placeholder="Categoria:"
            options={categoryOptions}
            isClearable
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <CheckboxList
            name="stores"
            options={storeChoiceOptions}
            label="Lojas"
            numberFieldLabel="Preço: "
            numberFieldPlaceholder="Preço personalizado"
            hideAllPriceInputs={!showPriceInput}
            disableCheckBox={userNotAdmin}
          />
          {!userNotAdmin && (
            <Checkbox
              name="partners"
              options={partnerChoiceOptions}
              label="Parceiros"
            />
          )}
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
