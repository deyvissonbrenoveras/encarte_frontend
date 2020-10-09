import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import LoadingIcon from '../../../components/LoadingIcon';
import { Table, Td, Th, Tr } from '../../../components/Table';

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
    <Table>
      <thead>
        <Tr>
          <Th>Id</Th>
          <Th>Nome</Th>
        </Tr>
      </thead>
      <tbody>
        {loading ? (
          <LoadingIcon />
        ) : (
          categories &&
          categories.map((category) => (
            <Tr>
              <Td>{category.id}</Td>
              <Td>
                <Link to={`/updatecategory/${category.id}`}>
                  {category.name}
                </Link>
              </Td>
            </Tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default Categories;
