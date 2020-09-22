import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import Privilege from '../../../util/PrivilegeEnum';

function UpdateUser() {
  return (
    <>
      <Form>
        <label htmlFor="name">Nome:</label>
        <Input name="name" placeholder="Insira o nome do usuário" />
        <label htmlFor="email">E-mail:</label>
        <Input
          type="email"
          name="email"
          placeholder="Insira o e-mail do usuário"
        />
        <label htmlFor="privilege">Privilegio:</label>
        <div>
          <Input type="radio" name="privilege" value={Privilege.ROOT} />
          <Input
            type="radio"
            name="privilege"
            value={Privilege.STORE_ADMINISTRATOR}
          />

          <Input
            type="radio"
            name="privilege"
            value={Privilege.SYSTEM_ADMINISTRATOR}
          />

          <Input type="radio" name="privilege" value={Privilege.USER} />
        </div>
      </Form>
    </>
  );
}

export default UpdateUser;
