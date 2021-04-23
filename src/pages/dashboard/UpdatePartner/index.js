import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { Grid, Button, Box, Paper, Tabs, Tab } from '@material-ui/core';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import api from '../../../services/api';

import Input from '../../../components/Input';
import Img from '../../../components/Img';
import CheckboxInput from '../../../components/CheckboxInput';
import Checkbox from '../../../components/Checkbox';
import LoadingIcon from '../../../components/LoadingIcon';
import {
  updatePartnerRequest,
  disassociateProductsFromPartner,
} from '../../../store/modules/partner/actions';

import useStyles from './styles';

function UpdatePartner({ match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const formRef = useRef(null);

  const [loadingPartner, setLoadingPartner] = useState(true);
  const [stores, setStores] = useState([]);
  const [storeChoiceOptions, setStoreChoiceOptions] = useState([]);
  const [products, setProducts] = useState([]);

  const [tabIndex, setTabIndex] = useState(0);
  function getData() {
    async function execGetData() {
      setLoadingPartner(true);
      try {
        const storeResponse = await api.get('stores');
        const storeOptions = storeResponse.data.map((store) => ({
          id: store.id,
          value: store.id,
          label: store.name,
          url: store.logo ? store.logo.url : null,
        }));
        setStoreChoiceOptions(storeOptions);

        const partnerResponse = await api.get(`partners/${id}`);
        setLoadingPartner(false);
        setProducts(partnerResponse.data.products);

        setStores(partnerResponse.data.stores);
        formRef.current.setData(partnerResponse.data);
      } catch (err) {
        toast.error('Houve um erro ao carregar o parceiro');
      }
    }
    execGetData();
  }
  useEffect(getData, [tabIndex, id]);

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
  async function submitHandle(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        logoId: Yup.number().required('Selecione uma imagem para o parceiro'),
        name: Yup.string()
          .max(100, 'Máximo de 100 caracteres')
          .required('O nome é obrigatório'),
        site: Yup.string().max(2048, 'Máximo de 2048 caracteres'),
        agentWhatsapp: Yup.string().nullable().notRequired(),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        regionalAgent: Yup.string().max(50, 'Máximo de 50 caracteres'),
        sponsorship: Yup.boolean(),
        customizableField: Yup.string(),
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
      {loadingPartner ? (
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
            <Tab label="Editar Parceiro" />
            <Tab label="Produtos" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <Form onSubmit={submitHandle} ref={formRef}>
              <Grid container justify="space-around">
                <Grid item xs={12} md={4}>
                  <Img name="logo" submitName="logoId" label="Imagem:" />
                  <CheckboxInput name="sponsorship" label="Patrocinador" />
                  <Input
                    name="name"
                    placeholder="Insira o nome do parceiro"
                    label="Nome:"
                  />
                  <Input
                    name="site"
                    placeholder="Insira o site"
                    label="Site:"
                  />
                  <Input
                    name="regionalAgent"
                    placeholder="Insira o nome do colaborador regional"
                    label="Colaborador regional:"
                  />

                  <Input
                    name="agentWhatsapp"
                    placeholder="Insira o Whatsapp do colaborador regional"
                    label="Whatsapp do colaborador regional"
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
                  <Checkbox
                    name="stores"
                    options={storeChoiceOptions}
                    label="Lojas"
                  />
                  <Input
                    name="customizableField"
                    placeholder="Insira o código html..."
                    label="Campo Personalizável"
                    multiline
                    rows={8}
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
                products &&
                products.map((product) => ({
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
                  disassociateProductsFromPartner(id, selected, () => {
                    getData();
                  })
                );
              }}
            />
          </TabPanel>
        </Paper>
      )}
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
