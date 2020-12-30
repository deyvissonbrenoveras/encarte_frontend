import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import LoadingIcon from '../../../components/LoadingIcon';
import AddButton from '../../../components/AddButton';
import CustomTable from '../../../components/CustomTable';

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
      <AddButton to="newcategory" />
      {loading ? (
        <LoadingIcon />
      ) : (
        <CustomTable
          label="Categorias"
          headCells={[
            {
              id: 'id',
              numeric: true,
              disablePadding: false,
              label: 'Id',
            },
            {
              id: 'name',
              numeric: false,
              disablePadding: false,
              label: 'Nome',
              type: 'link',
            },
          ]}
          rows={categories.map((category) => ({
            id: category.id,
            name: {
              href: `/updatecategory/${category.id}`,
              label: category.name,
            },
          }))}
        />
      )}
    </>
  );
}

export default Categories;
