import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Paper,
} from '@material-ui/core';
import LoadingIcon from '../../../components/LoadingIcon';
import api from '../../../services/api';

import AddButton from '../../../components/AddButton';

function Partners() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('partners');
        setPartners(response.data);
        setLoading(false);
      } catch (err) {
        toast.error('Não foi possível carregar os parceiros');
      }
    }
    getData();
  }, []);
  return (
    <>
      <AddButton to="newpartner" />
      {loading ? (
        <LoadingIcon />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Patrocinador</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Agente Regional</TableCell>
                <TableCell>Whatsapp Agente</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <LoadingIcon />
              ) : (
                partners &&
                partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <Avatar src={partner.logo.url} alt={partner.name} />
                    </TableCell>
                    <TableCell>
                      <Link to={`/updatepartner/${partner.id}`}>
                        {partner.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {partner.sponsorship ? (
                        <FaCheckSquare color="#4d88ff" />
                      ) : (
                        <FaSquare color="#dbdbdb" />
                      )}
                    </TableCell>
                    <TableCell>{partner.site}</TableCell>
                    <TableCell>{partner.regionalAgent}</TableCell>
                    <TableCell>{partner.agentWhatsapp}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Partners;
