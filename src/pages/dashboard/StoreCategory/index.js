import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../../../components/AddButton';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import PrivilegeEnum from '../../../util/PrivilegeEnum';
import CustomTable from '../../../components/CustomTable';

function StoreCategory() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.stores);
  const loading = useSelector((state) => state.store.loading);
  const profile = useSelector((state) => state.profile.profile);
  useEffect(() => {
    async function getStores() {
      dispatch(loadStoresRequest(true));
    }
    getStores();
  }, [dispatch]);
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
            },
            {
              id: 'url',
              numeric: false,
              disablePadding: false,
              label: 'Url',
            },
          ]}
          rows={stores.map((store) => ({
            id: store.id,
            name: { href: `/updatestore/${store.id}`, label: store.name },
            url: store.url,
          }))}
        />
      )}
    </>
  );
}
export default StoreCategory;
