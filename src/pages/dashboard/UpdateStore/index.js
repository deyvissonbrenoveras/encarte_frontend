import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { Form } from '@unform/web';

import {
  Grid,
  Box,
  Button,
  Paper,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  makeStyles,
} from '@material-ui/core';

import CustomTable from '../../../components/CustomTable';
import AddButton from '../../../components/AddButton';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Img from '../../../components/Img';
import CheckboxInput from '../../../components/CheckboxInput';
import LoadingIcon from '../../../components/LoadingIcon';
import ColorPicker from '../../../components/ColorPicker';

import { updateStoreRequest } from '../../../store/modules/store/actions';
import { disassociateProductsFromStore } from '../../../store/modules/product/actions';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
function UpdateStore({ match }) {
  const id = Number(match.params.id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const formRef = useRef(null);
  function getStore() {
    async function execGetStore() {
      setLoading(true);

      try {
        const response = await api.get(`store`, { params: { id } });
        setLoading(false);
        setStore(response.data);
        formRef.current.setData(response.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações da loja');
        setLoading(false);
      }
    }
    execGetStore();
  }
  useEffect(getStore, [tabIndex, id]);
  async function submitHandle(data) {
    console.log(data);
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
        coverId: Yup.number().nullable(),
        secondaryCoverId: Yup.number().nullable(),
        active: Yup.boolean(),
        shelfLifeStart: Yup.date('Data inválida').nullable(),
        shelfLifeEnd: Yup.date('Data inválida').nullable(),
        primaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
        secondaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
        tertiaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
        quaternaryColor: Yup.string()
          .matches(
            '^#(?:[0-9a-fA-F]{3}){1,2}$',
            'O valor deve ser um número hexadecimal'
          )
          .required('A cor é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
      dispatch(updateStoreRequest(id, data));
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
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const classes = useStyles();
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <Paper className={classes.root}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Editar Loja" />
            <Tab label="Produtos" />
            <Tab label="Parceiros" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <Form ref={formRef} onSubmit={submitHandle}>
              <Grid container justify="space-around">
                <Grid
                  container
                  justify="space-around"
                  style={{ marginBottom: 20 }}
                >
                  <Grid item xs={12} lg={3} style={{ margin: 10 }}>
                    <Img name="logo" submitName="logoId" label="Logo:" />
                  </Grid>
                  <Grid item xs={12} lg={3} style={{ margin: 10 }}>
                    <Img
                      name="cover"
                      submitName="coverId"
                      label="Imagem da campanha:"
                      showRemoveButton
                    />
                  </Grid>
                  <Grid item xs={12} lg={3} style={{ margin: 10 }}>
                    <Img
                      name="secondaryCover"
                      submitName="secondaryCoverId"
                      label="Imagem secundária da campanha:"
                      showRemoveButton
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={5}>
                  <CheckboxInput name="active" label="Ativo" />
                  <Input
                    name="name"
                    placeholder="Insira o nome da loja"
                    label="Nome:"
                  />
                  <Input name="url" placeholder="Insira a URL" label="URL:" />
                  <Input
                    name="address"
                    placeholder="Insira o endereço"
                    label="Endereço:"
                  />
                  <Input
                    name="city"
                    placeholder="Insira a cidade"
                    label="Cidade:"
                  />
                  <ColorPicker
                    name="primaryColor"
                    label="Selecione a cor primária:"
                  />
                  <ColorPicker
                    name="secondaryColor"
                    label="Selecione a cor secundária:"
                  />
                  <ColorPicker
                    name="tertiaryColor"
                    label="Selecione a cor terciária:"
                  />
                  <ColorPicker
                    name="quaternaryColor"
                    label="Selecione a cor quaternária:"
                  />
                </Grid>

                <Grid item xs={12} sm={6} lg={5}>
                  <Input
                    name="phone"
                    placeholder="Insira o telefone"
                    label="Telefone:"
                  />

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
                  <Input
                    name="shelfLifeStart"
                    label="Data início da validade do e-ncarte:"
                    type="date"
                  />
                  <Input
                    name="shelfLifeEnd"
                    label="Data fim da validade do e-ncarte:"
                    type="date"
                  />
                </Grid>

                <Box m={2} width="100%" textAlign="right">
                  <Button variant="contained" color="primary" type="submit">
                    Salvar
                  </Button>
                </Box>
              </Grid>
            </Form>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <CustomTable
              label="Produtos"
              selectionEnabled
              headCells={[
                {
                  id: 'id',
                  numeric: true,
                  disablePadding: false,
                  label: 'Id',
                },
                {
                  id: 'image',
                  numeric: false,
                  disablePadding: false,
                  label: 'Imagem',
                  type: 'image',
                },
                {
                  id: 'name',
                  numeric: false,
                  disablePadding: false,
                  label: 'Nome',
                  type: 'link',
                },
                {
                  id: 'price',
                  numeric: true,
                  disablePadding: false,
                  label: 'Preço',
                },
                {
                  id: 'featured',
                  numeric: false,
                  disablePadding: false,
                  label: 'Destaque',
                  type: 'bool',
                },
                {
                  id: 'category',
                  numeric: false,
                  disablePadding: false,
                  label: 'Categoria',
                },
              ]}
              rows={
                store.products &&
                store.products.map((product) => ({
                  id: product.id,
                  image: {
                    src: product.image ? product.image.url : '',
                    alt: product.name,
                  },
                  name: {
                    href: `/updateproduct/${product.id}`,
                    label: product.name,
                  },
                  price: product.price,
                  featured: product.featured,
                  category: product.category
                    ? product.category.name
                    : 'Sem categoria',
                }))
              }
              actionLabel="Desvincular produtos"
              actionCallback={(selected) => {
                dispatch(
                  disassociateProductsFromStore(id, selected, () => {
                    getStore();
                  })
                );
              }}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <TableContainer component={Paper}>
              <AddButton to="/newpartner" />
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Nome</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <LoadingIcon />
                  ) : (
                    store &&
                    store.partners &&
                    store.partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <Avatar src={partner.logo.url} alt={partner.name} />
                        </TableCell>
                        <TableCell>
                          <Link to={`/updatepartner/${partner.id}`}>
                            {partner.name}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Paper>
      )}
    </>
  );
}

export default UpdateStore;

UpdateStore.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
