import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { Typography, Grid, Button, Box } from '@material-ui/core';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Img from '../../../components/Img';
import CheckboxInput from '../../../components/CheckboxInput';
import Checkbox from '../../../components/Checkbox';
import LoadingIcon from '../../../components/LoadingIcon';

import { updatePartnerRequest } from '../../../store/modules/partner/actions';

function UpdatePartner({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const formRef = useRef(null);

  const [loadingPartner, setLoadingPartner] = useState(true);
  const [stores, setStores] = useState([]);
  const [choiceOptions, setChoiceOptions] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('stores');
        const options = response.data.map((store) => ({
          id: store.id,
          value: store.id,
          label: store.name,
          url: store.logo ? store.logo.url : null,
        }));
        setChoiceOptions(options);
        const partnerResponse = await api.get(`partners/${id}`);
        setLoadingPartner(false);
        formRef.current.setData(partnerResponse.data);
        setStores(partnerResponse.data.stores);
      } catch (err) {
        toast.error('Houve um erro ao carregar o parceiro');
      }
    }
    getData();
  }, []);
  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        logoId: Yup.number().required('Selecione uma imagem para o parceiro'),
        name: Yup.string()
          .max(100, 'Máximo de 100 caracteres')
          .required('O nome é obrigatório'),
        site: Yup.string().max(2048, 'Máximo de 2048 caracteres'),
        agentWhatsapp: Yup.number('Whatsapp inválido').typeError(
          'Whatsapp inválido'
        ),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        regionalAgent: Yup.string().max(50, 'Máximo de 50 caracteres'),
        sponsorship: Yup.boolean(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const partnerStores = stores.map((store) => Number(store.id));

      const removeStores = partnerStores.filter(
        (store) => !data.stores.includes(store)
      );
      const addStores = data.stores.filter((store) => {
        return !partnerStores.includes(store);
      });
      console.tron.log(removeStores, addStores);

      dispatch(updatePartnerRequest(id, data, removeStores, addStores));
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
      {loadingPartner && <LoadingIcon />}
      <Form onSubmit={submitHandle} ref={formRef}>
        <Typography variant="h5">Editar parceiro</Typography>
        <Grid container justify="space-around" xs={12}>
          <Grid item xs={12} md={4}>
            <Img name="logo" submitName="logoId" label="Imagem:" />
            <CheckboxInput name="sponsorship" label="Patrocinador" />
            <Input
              name="name"
              placeholder="Insira o nome do parceiro"
              label="Nome:"
            />
            <Input name="site" placeholder="Insira o site" label="Site:" />
            <Input
              name="regionalAgent"
              placeholder="Insira o nome do agente regional"
              label="Agente regional:"
            />

            <Input
              name="agentWhatsapp"
              placeholder="Insira o Whatsapp do agente regional"
              label="Whatsapp do agente regional"
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
          <Grid item xs={12} md={7}>
            <Checkbox name="stores" options={choiceOptions} label="Lojas" />
          </Grid>
          <Box m={2} width="100%" textAlign="right">
            <Button variant="contained" color="primary" type="submit">
              Salvar
            </Button>
          </Box>
        </Grid>
      </Form>
    </>
  );
}

export default UpdatePartner;

UpdatePartner.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
