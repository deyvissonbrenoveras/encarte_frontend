import React, { useState } from 'react';

import { FaRegUserCircle, FaUserEdit } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import { useDispatch } from 'react-redux';
import { Container, ProfileMenu } from './styles';

import { signOut } from '../../store/modules/auth/actions';

function Profile() {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);
  function handleSignOut() {
    dispatch(signOut());
  }
  function toggleVisibility() {
    setVisibility(!visibility);
  }
  return (
    <Container>
      <FaRegUserCircle onClick={toggleVisibility} />
      <ProfileMenu visibility={visibility}>
        <button type="button">
          <FaUserEdit />
          Perfil
        </button>
        <button type="button" onClick={() => handleSignOut()}>
          <BiLogOut />
          Sair
        </button>
      </ProfileMenu>
    </Container>
  );
}

export default Profile;
