import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddButton from '../../../components/AddButton';
import LoadingIcon from '../../../components/LoadingIcon';
import PrivilegeEnum from '../../../util/PrivilegeEnum';
import CustomTable from '../../../components/CustomTable';

import api from '../../../services/api';

function StoreCategory() {

  const [storeCategory, setStoreCategory] = useState([])
  const [loading, setLoading] = useState(true);
  
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    async function getStores() {
      const response = await api.get('/store-categories');
      setStoreCategory(response.data);
      setLoading(false);
    }
    if(loading) {
      getStores();
    }
  }, [loading]);
  return (
    <>
      {profile.privilege <= PrivilegeEnum.SYSTEM_ADMINISTRATOR && (
        <AddButton to="newstorecategory" />
      )}

      {loading ? (
        <LoadingIcon />
      ) : (
        <CustomTable
          label="Categorias de lojas"
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
            }
          ]}
          rows={storeCategory.map((category) => ({
            id: category.id,
            name: { href: `/updatestore/${category.id}`, label: category.name },
          }))}
        />
      )}
    </>
  );
}
export default StoreCategory;
