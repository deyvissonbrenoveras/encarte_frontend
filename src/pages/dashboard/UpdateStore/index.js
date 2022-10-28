import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Select from '../../../components/Select';

import { formatPrice } from '../../../util/format';

import { updateStoreRequest } from '../../../store/modules/store/actions';
import { disassociateProductsFromStore } from '../../../store/modules/product/actions';
import PrivilegeEnum from '../../../util/PrivilegeEnum';

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

  const [userNotAdmin, setUserNotAdmin] = useState(false);
  const userProfile = useSelector((state) => state.profile.profile);

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setUserNotAdmin(userProfile.privilege > PrivilegeEnum.SYSTEM_ADMINISTRATOR);
  }, [userProfile]);

  async function getCities() {
    const response = await api.get('locations/cities');
    const cityOptions = response.data.map((city) => ({
      value: city.id,
      label: `${city.name} - ${city.state.uf}`,
    }));

    setCities(cityOptions);
  }

  async function getStore() {
    const response = await api.get(`store`, { params: { id } });
    setStore(response.data);
  }

  async function getCategories() {
    const response = await api.get('/store-categories');
    const categoriesOptions = response.data.map((category) => ({
      value: category.id,
      label: `${category.name}`,
    }));
    setCategories(categoriesOptions);
  }

  function fetch() {
    async function execGetStore() {
      setLoading(true);

      try {
        await getCities();
        await getCategories();
        await getStore();

        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error('Houve um erro ao carregar as informações da loja');
        setLoading(false);
      }
    }
    execGetStore();
  }

  useEffect(() => {
    if (!loading && store && formRef.current) formRef.current.setData(store);
  }, [loading, store]);

  useEffect(fetch, [tabIndex, id]);

  async function submitHandle(data) {
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
        cityId: Yup.number()
          .positive()
          .required('A cidade é obrigatória')
          .typeError('A cidade é obrigatória'),
        storeCategoryId: Yup.number()
          .positive()
          .required('A categoria é obrigatória')
          .typeError('A categoria é obrigatória'),
        phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
        whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        logoId: Yup.number()
          .required('Selecione uma logo')
          .typeError('Selecione uma logo'),
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
            {!userNotAdmin && <Tab label="Parceiros" />}
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
                    <Img
                      name="logo"
                      submitName="logoId"
                      label="Logo:"
                      readOnly={userNotAdmin}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3} style={{ margin: 10 }}>
                    <Img
                      name="cover"
                      submitName="coverId"
                      label="Imagem da campanha:"
                      showRemoveButton
                      readOnly={userNotAdmin}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3} style={{ margin: 10 }}>
                    <Img
                      name="secondaryCover"
                      submitName="secondaryCoverId"
                      label="Imagem secundária da campanha:"
                      showRemoveButton
                      readOnly={userNotAdmin}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={5}>
                  <CheckboxInput
                    name="active"
                    label="Ativo"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="name"
                    placeholder="Insira o nome da loja"
                    label="Nome:"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="url"
                    placeholder="Insira a URL"
                    label="URL:"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="address"
                    placeholder="Insira o endereço"
                    label="Endereço:"
                    readOnly={userNotAdmin}
                  />
                  <Select
                    name="cityId"
                    placeholder="Cidade:"
                    options={cities}
                    isClearable
                    readOnly={userNotAdmin}
                  />
                  <Select
                    name="storeCategoryId"
                    placeholder="Categoria:"
                    options={categories}
                    isClearable
                    readOnly={userNotAdmin}
                  />
                  <ColorPicker
                    name="primaryColor"
                    label="Selecione a cor primária:"
                    readOnly={userNotAdmin}
                  />
                  <ColorPicker
                    name="secondaryColor"
                    label="Selecione a cor secundária:"
                    readOnly={userNotAdmin}
                  />
                  <ColorPicker
                    name="tertiaryColor"
                    label="Selecione a cor terciária:"
                    readOnly={userNotAdmin}
                  />
                  <ColorPicker
                    name="quaternaryColor"
                    label="Selecione a cor quaternária:"
                    readOnly={userNotAdmin}
                  />
                </Grid>

                <Grid item xs={12} sm={6} lg={5}>
                  <Input
                    name="phone"
                    placeholder="Insira o telefone"
                    label="Telefone:"
                    readOnly={userNotAdmin}
                  />

                  <Input
                    name="whatsapp"
                    placeholder="Insira o Whatsapp"
                    label="Whatsapp:"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="instagram"
                    placeholder="Insira o Instagram"
                    label="Instagram:"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="facebook"
                    placeholder="Insira o Facebook"
                    label="Facebook:"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="shelfLifeStart"
                    label="Data início da validade do e-ncarte:"
                    type="date"
                    readOnly={userNotAdmin}
                  />
                  <Input
                    name="shelfLifeEnd"
                    label="Data fim da validade do e-ncarte:"
                    type="date"
                    readOnly={userNotAdmin}
                  />
                </Grid>
                {!userNotAdmin && (
                  <Box m={2} width="100%" textAlign="right">
                    <Button variant="contained" color="primary" type="submit">
                      Salvar
                    </Button>
                  </Box>
                )}
              </Grid>
            </Form>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <CustomTable
              label="Produtos"
              selectionEnabled={!userNotAdmin}
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
                  id: 'customPrice',
                  numeric: true,
                  disablePadding: false,
                  label: 'Preço personalizado',
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
                  price: formatPrice(product.price),
                  customPrice: product.Products_Stores.customPrice
                    ? formatPrice(product.Products_Stores.customPrice)
                    : '',
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
