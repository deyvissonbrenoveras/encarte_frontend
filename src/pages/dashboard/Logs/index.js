import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from '../../../components/CustomTable';
import LoadingIcon from '../../../components/LoadingIcon';
import { loadLogsRequest } from '../../../store/modules/log/actions';

function Logs() {
  const dispatch = useDispatch();
  const { logs, loading } = useSelector((state) => state.log);

  useEffect(() => {
    async function getLogs() {
      dispatch(loadLogsRequest('', ''));
    }
    getLogs();
  }, [dispatch]);

  return loading ? (
    <LoadingIcon />
  ) : (
    <div>
      <CustomTable
        label="Logs"
        initialRowsPerPage={10}
        headCells={[
          {
            id: 'id',
            numeric: true,
            disablePadding: false,
            label: 'Id',
          },
          {
            id: 'user',
            numeric: false,
            disablePadding: false,
            label: 'Usuário',
          },
          {
            id: 'product',
            numeric: false,
            disablePadding: false,
            label: 'Produto',
          },
          {
            id: 'store',
            numeric: false,
            disablePadding: false,
            label: 'Loja',
          },
          {
            id: 'oldValue',
            numeric: false,
            disablePadding: false,
            label: 'Valor anterior',
          },
          {
            id: 'newValue',
            numeric: false,
            disablePadding: false,
            label: 'Valor atualizado',
          },
          {
            id: 'createdAt',
            numeric: false,
            disablePadding: false,
            label: 'Registrado em',
          },
        ]}
        rows={logs.map((log) => ({
          id: log.id,
          user: log.user.name,
          product: log.product.name,
          store: log.store ? log.store.name : '',
          oldValue: log.oldValue,
          newValue: log.newValue,
          createdAt: log.createdAt,
        }))}
      />
    </div>
  );
}

export default Logs;
