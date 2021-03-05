import React, { useState, useCallback } from 'react';
import { useModal } from '../../../hooks/ModalContext';
import ModalInfo from '../Info';
import * as S from './styles';

interface IModalProps {
  idNaver: string;
}

const ConfirmeExclude: React.FC<IModalProps> = ({ idNaver }) => {
  const { closeModal, setContentModal } = useModal();

  const handleDeleteNaver = useCallback(() => {
    setContentModal(
      <ModalInfo
        title="Naver criado"
        customMessage="Naver criado com sucesso!"
      />
    );
  }, []);

  const closeModalFunc = useCallback(() => {
    closeModal();
  }, []);

  return (
    <S.Container>
      <header>
        <span>Excluir Naver</span>
      </header>
      <p>Tem certeza que deseja excluir este Naver ?</p>
      <footer>
        <S.BtnWhite onClick={closeModalFunc}>Cancelar</S.BtnWhite>
        <S.Btn onClick={handleDeleteNaver}>Excluir</S.Btn>
      </footer>
    </S.Container>
  );
};

export default ConfirmeExclude;
