/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
// import { useModal } from 'react-simple-hook-modal';
import { useAppSelector } from '../../hooks/reduxHook';
import * as S from './styles';
import { INaver } from '../../Interface/INavers';
import ErrorMessage from '../../components/ErrorMessage';
import { getNaversAPI } from '../../utils/getDataFromApi';
import ConfirmExclude from '../../components/Modal/ConfirmExclude';
import { useModal } from '../../hooks/ModalContext';

const Dashboard: React.FC = () => {
  const token = useAppSelector(state => state.user.data?.token);
  const history = useHistory();
  const { openModal, setContentModal } = useModal();
  const [navers, setNavers] = useState<INaver[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState();

  const getNavers = useCallback(async () => {
    try {
      const data: INaver[] = await getNaversAPI({
        path: 'navers',
        token,
      });
      setNavers(data);
    } catch (err) {
      setisError(err.response.data.message);
    }
    setisLoading(false);
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
                <MdEdit size={20} />
              </div>
            </S.Naver>
          ))}
        </S.Content>
      )}
    </S.Container>
  );
};

export default Dashboard;
