import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';

import { toast } from 'react-toastify';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Typography,
} from '@material-ui/core';
import AddButton from '../../../components/AddButton';
import api from '../../../services/api';
import LoadingIcon from '../../../components/LoadingIcon';
import CustomTable from '../../../components/CustomTable';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Houve um erro ao carregar as informações dos produtos');
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <AddButton to="newproduct" />
      {/* <Typography align="center" variant="h5">
        Produtos
      </Typography> */}
      <CustomTable
        label="Produtos"
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
            numeric: false,
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
        rows={products.map((product) => ({
          id: product.id,
          image: {
            src: product.image ? product.image.url : '',
            alt: product.name,
          },
          name: { href: `/updateproduct/${product.id}`, label: product.name },
          price: product.price,
          featured: product.featured,
          category: product.category ? product.category.name : 'Sem categoria',
        }))}
      />
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Destaque</TableCell>
              <TableCell>Categoria</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>
                  <LoadingIcon />
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Avatar
                      src={product.image ? product.image.url : ''}
                      alt={product.name}
                    />
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
                    {product.category ? product.category.name : 'Sem categoria'}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}

export default Products;
