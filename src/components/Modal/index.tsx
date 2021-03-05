import React from 'react';

import { AnyStyledComponent } from 'styled-components';
import { useModal } from '../../hooks/ModalContext';

import * as S from './styles';

interface IModalProps {
  className?: AnyStyledComponent;
}

const MyModal: React.FC<IModalProps> = ({ className, children }) => {
  const { closeModal, statusModal } = useModal();
  if (statusModal) {
    return (
      <S.Container
        onClick={e => {
          closeModal();
        }}
      >
        <S.Content
          className={className}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </S.Content>
      </S.Container>
    );
  }

  return null;
};

export default MyModal;
