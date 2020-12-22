import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { Typography, Grid, Button, Box } from '@material-ui/core';
import { toast } from 'react-toastify';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { updateRequest } from '../../../store/modules/user/actions';

import Checkbox from '../../../components/Checkbox';

import LoadingIcon from '../../../components/LoadingIcon';

import Privilege from '../../../util/PrivilegeEnum';
import api from '../../../services/api';
import CheckboxInput from '../../../components/CheckboxInput';

const selectOptions = [
  { value: Privilege.ROOT, label: 'Root' },
  {
    value: Privilege.SYSTEM_ADMINISTRATOR,
    label: 'Administrador do sistema',
  },
  { value: Privilege.STORE_ADMINISTRATOR, label: 'Administrador de loja' },
  { value: Privilege.USER, label: 'Usuário' },
];

function UpdateUser({ match }) {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [choiceOptions, setChoiceOptions] = useState([]);
  const id = Number(match.params.id);
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
        const response = await api.get(`users/${id}`);
        formRef.current.setData(response.data);
        setStores(response.data.stores);
        setLoading(false);
      } catch (err) {
        toast.error('Houve um erro ao carregar o usuário');
      }
    }
    getData();
  }, [id]);

  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        privilege: Yup.number().required('O privilégio é obrigatório'),
        active: Yup.boolean(),
        password: Yup.string(),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), null],
          'As senhas não conferem'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const userStores = stores.map((store) => Number(store.id));

      const removeStores = userStores.filter(
        (store) => !data.stores.includes(store)
      );

      const addStores = data.stores.filter((store) => {
        return !userStores.includes(store);
      });
      dispatch(updateRequest(id, data, removeStores, addStores));
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
      {loading ? <LoadingIcon /> : null}
      <Form onSubmit={submitHandle} ref={formRef}>
        <Typography variant="h5">Editar Usuário</Typography>

        <Grid container justify="space-around">
          <Grid item xs={12} md={4}>
            <CheckboxInput name="active" label="Ativo" />
            <Input
              name="name"
              placeholder="Insira o nome do usuário"
              label="Nome:"
            />
            <Input
              type="email"
              name="email"
              placeholder="Insira o e-mail do usuário"
              label="E-mail:"
            />
            <Input
              type="password"
              name="password"
              placeholder="Insira uma nova senha"
              label="Senha:"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirme a senha"
              label="Confirmação de senha:"
            />
            <Select
              name="privilege"
              options={selectOptions}
              label="Privilegio:"
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

export default UpdateUser;

UpdateUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
