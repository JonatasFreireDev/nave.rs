/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { getNaversAPI } from '../../store/navers.store';
import * as S from './styles';
import ErrorMessage from '../../components/ErrorMessage';
import ConfirmExclude from '../../components/Modal/ConfirmExclude';
import { useModal } from '../../hooks/ModalContext';

const Dashboard: React.FC = () => {
  const token = useAppSelector(state => state.user.data?.token);
  const navers = useAppSelector(state => state.navers.navers);
  const isLoading = useAppSelector(state => state.navers.isLoading);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { openModal, setContentModal } = useModal();
  const [isError, setisError] = useState();

  const getNavers = useCallback(async () => {
    try {
      await dispatch(
        getNaversAPI({
          token,
        })
      )
        .then(unwrapResult)
        .catch(err => {
          throw new Error(err);
        });
    } catch (err) {
      setisError(err.message);
    }
  }, []);

  useEffect(() => {
    getNavers();
  }, [getNavers]);

  const goTo = useCallback((path: string) => {
    history.push(path);
  }, []);

  const deleteNaver = useCallback((id: string) => {
    setContentModal(<ConfirmExclude idNaver={id} />);
    openModal();
  }, []);

  return (
    <S.Container>
      <header>
        <span>Navers</span>
        <S.ButtonNaver
          onClick={() => {
            goTo('/createNaver');
          }}
        >
          Adicionar Naver
        </S.ButtonNaver>
      </header>
      {isLoading ? (
        <S.Loading />
      ) : isError ? (
        <ErrorMessage message={isError} />
      ) : navers.length === 0 ? (
        <h2>Não há nenhum Naver cadastrado !</h2>
      ) : (
        <S.Content>
          {navers.map(naver => (
            <S.Naver key={naver.id}>
              <img src={naver.url} alt={naver.name} />
              <strong>{naver.name}</strong>
              <span>{naver.job_role}</span>
              <div>
                <MdDelete
                  size={20}
                  onClick={() => {
                    deleteNaver(naver.id);
                  }}
                />
                <MdEdit
                  size={20}
                  onClick={() => {
                    goTo(`/updateNaver/${naver.id}`);
                  }}
                />
              </div>
            </S.Naver>
          ))}
        </S.Content>
      )}
    </S.Container>
  );
};

export default Dashboard;
