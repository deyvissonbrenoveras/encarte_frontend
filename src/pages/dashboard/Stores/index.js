import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../../../components/AddButton';
// import TableTest from './TableTest';
import { loadStoresRequest } from '../../../store/modules/store/actions';
import LoadingIcon from '../../../components/LoadingIcon';
import PrivilegeEnum from '../../../util/PrivilegeEnum';
import CustomTable from '../../../components/CustomTable';

function Stores() {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.store.stores);
  const loading = useSelector((state) => state.store.loading);
  const profile = useSelector((state) => state.profile.profile);
  useEffect(() => {
    async function getStores() {
      dispatch(loadStoresRequest());
    }
    getStores();
  }, [dispatch]);
  return (
    <>
      {profile.privilege <= PrivilegeEnum.SYSTEM_ADMINISTRATOR && (
        <AddButton to="newstore" />
      )}

      {loading ? (
        <LoadingIcon />
      ) : (
        <CustomTable
          label="Lojas"
          headCells={[
            {
              id: 'id',
              numeric: true,
              disablePadding: false,
              label: 'Id',
            },
            {
              id: 'logo',
              numeric: false,
              disablePadding: false,
              label: 'Logo',
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
              id: 'url',
              numeric: false,
              disablePadding: false,
              label: 'Url',
            },
          ]}
          rows={stores.map((store) => ({
            id: store.id,
            logo: {
              src: store.logo ? store.logo.url : '',
              alt: store.name,
            },
            name: { href: `/updatestore/${store.id}`, label: store.name },
            url: store.url,
          }))}
        />
      )}
      {/* <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>URL</TableCell>
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
              stores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>
                    <Avatar
                      src={store.logo ? store.logo.url : ''}
                      alt={store.name}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/updatestore/${store.id}`}>{store.name}</Link>
                  </TableCell>
                  <TableCell>{store.url}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
}
export default Stores;
