import React from 'react';
import CustomTable from '../../../components/CustomTable';

function Logs() {
  return (
    <CustomTable
      label="Logs"
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
      rows={[{}]}
    />
  );
}

export default Logs;
