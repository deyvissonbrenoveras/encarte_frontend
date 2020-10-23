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

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('products');
        console.tron.log(response.data);
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
      <Typography align="center" variant="h5">
        Produtos
      </Typography>
      <TableContainer component={Paper}>
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
      </TableContainer>
    </>
  );
}

export default Products;
