import React, { useCallback } from 'react';
import { Modal } from 'react-simple-hook-modal';

import { MdClose } from 'react-icons/md';
import * as S from './styles';
import '../styles.css';

interface IModalProps {
  title: string;
  customMessage: string;
  isModalOpen: boolean;
  closeModal(): void;
}

const ModalInfo: React.FC<IModalProps> = ({
  title,
  customMessage,
  isModalOpen,
  closeModal,
}) => {
  return (
    <Modal
      id="any-unique-identifier"
      isOpen={isModalOpen}
      modalClassName="modal"
    >
      <S.Container>
        <header>
          <span>{title}</span>
          <MdClose size={18} onClick={() => closeModal()} />
        </header>
        <p>{customMessage}</p>
      </S.Container>
    </Modal>
  );
};

export default ModalInfo;
