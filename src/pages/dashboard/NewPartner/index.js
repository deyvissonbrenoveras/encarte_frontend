import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Img from '../../../components/Img';
import CheckboxInput from '../../../components/CheckboxInput';
import Checkbox from '../../../components/Checkbox';

import { SaveButton } from '../../../components/Buttons';

import { Container, FormHeader } from './styles';

import { addPartnerRequest } from '../../../store/modules/partner/actions';

function NewPartner() {
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
        logoId: Yup.number().required('Selecione uma imagem para o parceiro'),
        name: Yup.string()
          .max(100, 'Máximo de 100 caracteres')
          .required('O nome é obrigatório'),
        site: Yup.string().max(2048, 'Máximo de 2048 caracteres'),
        agentWhatsapp: Yup.number('Whatsapp inválido').typeError(
          'Whatsapp inválido'
        ),
        regionalAgent: Yup.string().max(50, 'Máximo de 50 caracteres'),
        sponsorship: Yup.boolean(),
        stores: Yup.array().min(1, 'Selecione pelo menos uma loja'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      dispatch(addPartnerRequest(data));
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
      <Form onSubmit={submitHandle} ref={formRef}>
        <FormHeader>
          <h2>Novo parceiro</h2>
          <CheckboxInput name="sponsorship" label="Patrocinador" />
        </FormHeader>
        <Img name="logo" submitName="logoId" label="Imagem:" />

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
        <Checkbox name="stores" options={choiceOptions} />

        <SaveButton type="submit">Salvar</SaveButton>
      </Form>
    </Container>
  );
}

export default NewPartner;
