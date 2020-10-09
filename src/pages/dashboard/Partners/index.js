import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Table, Td, Th, Tr } from '../../../components/Table';
import AvatarImg from '../../../components/AvatarImg';
import LoadingIcon from '../../../components/LoadingIcon';
import api from '../../../services/api';

// import { Container } from './styles';

function Partners() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get('partners');
        console.tron.log(response.data);
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
      <Table>
        <thead>
          <Tr>
            <Th>Id</Th>
            <Th>Logo</Th>
            <Th>Nome</Th>
            <Th>Site</Th>
            <Th>Patrocinador</Th>
          </Tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingIcon />
          ) : (
            partners &&
            partners.map((partner) => (
              <Tr>
                <Td>{partner.id}</Td>
                <Td>
                  <AvatarImg
                    src={partner.logo && partner.logo.url}
                    alt="logo"
                  />
                </Td>
                <Td>
                  <Link to={`/updatepartner/${partner.id}`}>
                    {partner.name}
                  </Link>
                </Td>
                <Td>{partner.site}</Td>
                <Td>
                  {partner.sponsorship ? (
                    <FaCheckSquare color="#4d88ff" />
                  ) : (
                    <FaSquare color="#dbdbdb" />
                  )}
                </Td>
              </Tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export default Partners;
