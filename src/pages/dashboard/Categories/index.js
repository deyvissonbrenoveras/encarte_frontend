import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@material-ui/core';
import api from '../../../services/api';
import LoadingIcon from '../../../components/LoadingIcon';

// import { Container } from './styles';

function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <Typography align="center" variant="h5">
        Categorias
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <LoadingIcon />
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>
                    <Link to={`/updatecategory/${category.id}`}>
                      {category.name}
                    </Link>
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

export default Categories;
