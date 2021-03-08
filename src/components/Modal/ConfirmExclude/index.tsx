import React, { useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteNaverStore } from '../../../store/navers.store';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHook';
import { useModal } from '../../../hooks/ModalContext';
import ModalInfo from '../Info';
import * as S from './styles';

interface IModalProps {
  idNaver: string;
}

const ConfirmeExclude: React.FC<IModalProps> = ({ idNaver }) => {
  const token = useAppSelector(state => state.user.data?.token!);
  const dispatch = useAppDispatch();
  const { closeModal, setContentModal } = useModal();

  const handleDeleteNaver = useCallback(async () => {
    try {
      await dispatch(deleteNaverStore({ idNaver, token }))
        .then(unwrapResult)
        .then(() => {
          setContentModal(
            <ModalInfo
              title="Naver excluído"
              customMessage="Naver excluído com sucesso!"
            />
          );
        })
        .catch(err => {
          throw new Error(err);
        });
    } catch (err) {
      setContentModal(
        <ModalInfo title="Ocorreu algum erro !" customMessage={err.message} />
      );
    }
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
