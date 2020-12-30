import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingIcon from '../../../components/LoadingIcon';
import api from '../../../services/api';

import AddButton from '../../../components/AddButton';
import CustomTable from '../../../components/CustomTable';

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
        <CustomTable
          label="Parceiros"
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
              id: 'sponsorship',
              numeric: false,
              disablePadding: false,
              label: 'Patrocinador',
              type: 'bool',
            },
            {
              id: 'site',
              numeric: false,
              disablePadding: false,
              label: 'Site',
            },
            {
              id: 'regionalAgent',
              numeric: false,
              disablePadding: false,
              label: 'Agente Regional',
            },
            {
              id: 'agentWhatsapp',
              numeric: false,
              disablePadding: false,
              label: 'Whatsapp Agente',
            },
          ]}
          rows={partners.map((partner) => ({
            id: partner.id,
            logo: {
              src: partner.logo ? partner.logo.url : '',
              alt: partner.name,
            },
            name: { href: `/updatepartner/${partner.id}`, label: partner.name },
            sponsorship: partner.sponsorship,
            site: partner.site,
            regionalAgent: partner.regionalAgent,
            agentWhatsapp: partner.agentWhatsapp,
          }))}
        />
      )}
    </>
  );
}

export default Partners;
