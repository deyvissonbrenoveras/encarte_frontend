import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
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
import { Link } from 'react-router-dom';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import api from '../../../services/api';
import Input from '../../../components/Input';
import Img from '../../../components/Img';

import LoadingIcon from '../../../components/LoadingIcon';

import { updateStoreRequest } from '../../../store/modules/store/actions';

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

  useEffect(() => {
    async function getStore() {
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
    getStore();
  }, [tabIndex, id]);
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
        city: Yup.string().max(100, 'Máximo de 100 caracteres'),
        phone: Yup.string().max(100, 'Máximo de 100 caracteres'),
        whatsapp: Yup.string().max(100, 'Máximo de 100 caracteres'),
        instagram: Yup.string().max(100, 'Máximo de 100 caracteres'),
        facebook: Yup.string().max(100, 'Máximo de 100 caracteres'),
        logoId: Yup.number().required('Selecione uma logo'),
        coverId: Yup.number(),
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
            <Tab label="Parceiros" />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <Form ref={formRef} onSubmit={submitHandle}>
              <Grid container justify="space-around">
                <Grid item xs={12} md={5}>
                  <Img name="logo" submitName="logoId" label="Logo:" />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Img
                    name="cover"
                    submitName="coverId"
                    label="Imagem da campanha:"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={5}>
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
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Imagem</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Preço</TableCell>
                    <TableCell>Destaque</TableCell>
                    <TableCell>Categoria</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <LoadingIcon />
                  ) : (
                    store &&
                    store.products &&
                    store.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Avatar src={product.image.url} alt={product.name} />
                        </TableCell>
                        <TableCell>
                          <Link to={`/updateproduct/${product.id}`}>
                            {product.name}
                          </Link>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          {product.featured ? (
                            <FaCheckSquare color="#4d88ff" />
                          ) : (
                            <FaSquare color="#dbdbdb" />
                          )}
                        </TableCell>
                        <TableCell>
                          {product.category
                            ? product.category.name
                            : 'Sem categoria'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <TableContainer component={Paper}>
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
