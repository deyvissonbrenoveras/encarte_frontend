import React, { useEffect } from 'react';
import history from '../../../services/history';

function Index() {
  useEffect(() => {
    history.push('/lojas');
  }, []);
  return <div />;
}

export default Index;
