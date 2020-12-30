import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
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
      {loading ? (
        <LoadingIcon />
      ) : (
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
            category: product.category
              ? product.category.name
              : 'Sem categoria',
          }))}
          actionLabel="Desvincular produtos"
          actionCallback={(selected) => {
            console.tron.log(selected);
          }}
        />
      )}
    </>
  );
}

export default Products;
