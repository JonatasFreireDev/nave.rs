import React from 'react';

import { MdClose } from 'react-icons/md';
import * as S from './styles';

import { useModal } from '../../../hooks/ModalContext';

interface IModalProps {
  title: string;
  customMessage: string;
}

const ModalInfo: React.FC<IModalProps> = ({ title, customMessage }) => {
  const { closeModal } = useModal();
  return (
    <S.Container>
      <header>
        <span>{title}</span>
        <MdClose size={18} onClick={() => closeModal()} />
      </header>
      <p>{customMessage}</p>
    </S.Container>
  );
};

export default ModalInfo;
