import React from 'react';
import { IconButton } from '@material-ui/core';
import { Facebook, Instagram, WhatsApp } from '@material-ui/icons';

export default function SocialNetworks({ facebook, instagram, whatsapp }) {
  return (
    <div>
      {facebook && (
        <IconButton
          onClick={() => {
            window.open(`https://facebook.com/${facebook}`);
          }}
        >
          <Facebook style={{ fill: '#4267B2' }} fontSize="large" />
        </IconButton>
      )}
      {instagram && (
        <IconButton
          onClick={() => {
            window.open(`https://instagram.com/${instagram}`);
          }}
        >
          <Instagram style={{ fill: '#C13584' }} fontSize="large" />
        </IconButton>
      )}
      {whatsapp && (
        <IconButton
          onClick={() => {
            window.open(`https://api.whatsapp.com/send?phone=${whatsapp}`);
          }}
        >
          <WhatsApp
            style={{
              fill: 'white',
              backgroundColor: '#128C7E',
              borderRadius: 10,
            }}
            fontSize="large"
          />
        </IconButton>
      )}
    </div>
  );
}
