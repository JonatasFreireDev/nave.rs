import React, { useCallback } from 'react';

import * as S from './styles';
import { useAppDispatch } from '../../hooks/reduxHook';
import { signOut } from '../../store/user.store';

const Input: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <>
      <S.Container>
        <S.Logo />
        <button onClick={handleSignOut}>Sair</button>
      </S.Container>
      {children}
    </>
  );
};

export default Input;
