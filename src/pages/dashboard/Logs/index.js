import React, { useEffect, useRef } from 'react';
import { startOfDay, endOfDay, subDays, addMinutes, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CustomTable from '../../../components/CustomTable';
import LoadingIcon from '../../../components/LoadingIcon';
import Input from '../../../components/Input';
import { loadLogsRequest } from '../../../store/modules/log/actions';

import { Form } from '@unform/web';

import { Grid, Button } from '@material-ui/core';

function Logs() {
  const dispatch = useDispatch();

  const formRef = useRef(null);
  const { logs, loading } = useSelector((state) => state.log);

  useEffect(() => {
    async function getLogs() {
      const now = Date.now();
      const initialStartDate = startOfDay(subDays(now, 30));
      const initialEndDate = endOfDay(now);
      formRef.current.setData({
        startDate: initialStartDate,
        endDate: initialEndDate,
      });
      dispatch(loadLogsRequest(initialStartDate, initialEndDate));
    }
    getLogs();
  }, [dispatch]);

  async function onSubmitHandle({ startDate, endDate }) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        startDate: Yup.date('Data inválida').required(
          'A data início é obrigatória'
        ),
        endDate: Yup.date('Data inválida').required('A data fim é obrigatória'),
      });

      await schema.validate(
        { startDate, endDate },
        {
          abortEarly: false,
        }
      );

      const formattedStartDate = startOfDay(
        addMinutes(new Date(startDate), new Date(startDate).getTimezoneOffset())
      );
      const formattedEndDate = endOfDay(
        addMinutes(new Date(endDate), new Date(endDate).getTimezoneOffset())
      );

      dispatch(loadLogsRequest(formattedStartDate, formattedEndDate));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return loading ? (
    <LoadingIcon />
  ) : (
    <Grid container>
      <Form ref={formRef} onSubmit={onSubmitHandle}>
        <Grid container>
          <Grid item xs={6} lg={2}>
            <Input name="startDate" label="Data início" type="date" />
          </Grid>

          <Grid item xs={6} lg={2}>
            <Input name="endDate" label="Data fim" type="date" />
          </Grid>
          <Grid item xs={6} lg={2} style={{ padding: '5px 10px' }}>
            <Button variant="contained" color="primary" type="submit">
              filtrar
            </Button>
          </Grid>
        </Grid>
      </Form>

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
            id: 'field',
            numeric: false,
            disablePadding: false,
            label: 'Campo',
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
          field: log.field,
          oldValue: log.oldValue,
          newValue: log.newValue,
          createdAt: format(new Date(log.createdAt), `dd/MM/yyyy 'às' HH:mm`),
        }))}
      />
    </Grid>
  );
}

export default Logs;
