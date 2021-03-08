/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { getNaversStore } from '../../store/navers.store';
import * as S from './styles';
import ConfirmExclude from '../../components/Modal/ConfirmExclude';
import NaverInfo from '../../components/Modal/NaverInfo';
import { useModal } from '../../hooks/ModalContext';
import LoadComponent from '../../components/LoadComponent';

const Dashboard: React.FC = () => {
  const navers = useAppSelector(state => state.navers.navers);
  const token = useAppSelector(state => state.user.data?.token);
  const isLoading = useAppSelector(state => state.navers.isLoading);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { setContentModal } = useModal();
  const [isError, setisError] = useState();

  useEffect(() => {
    getNavers();
  }, []);

  const getNavers = useCallback(async () => {
    await dispatch(getNaversStore({ token }))
      .then(unwrapResult)
      .catch(err => {
        setisError(err.message);
      });
  }, []);

  const goTo = useCallback((path: string) => {
    history.push(path);
  }, []);

  const deleteNaver = useCallback((id: string) => {
    setContentModal(<ConfirmExclude idNaver={id} />);
  }, []);

  const openInfo = useCallback((id: string) => {
    setContentModal(<NaverInfo idNaver={id} />);
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
      <LoadComponent isLoading={isLoading} isError={isError}>
        {navers.length === 0 ? (
          <h2>Não há nenhum Naver cadastrado !</h2>
        ) : (
          <S.Content>
            {navers.map(naver => (
              <S.Naver key={naver.id}>
                <img
                  onClick={() => {
                    openInfo(naver.id);
                  }}
                  src={naver.url}
                  alt={naver.name}
                />
                <strong
                  onClick={() => {
                    openInfo(naver.id);
                  }}
                >
                  {naver.name}
                </strong>
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
      </LoadComponent>
    </S.Container>
  );
};

export default Dashboard;
