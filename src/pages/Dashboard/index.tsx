/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';
import * as S from './styles';
import { INaver } from '../../Interface/INavers';
import ErrorMessage from '../../components/ErrorMessage';
import { getNaversAPI } from '../../utils/getDataFromApi';

const Dashboard: React.FC = () => {
  const token = useAppSelector(state => state.user.data?.token);
  const history = useHistory();
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
        navers.map(naver => (
          <div>
            <p>{naver.name}</p>
          </div>
        ))
      )}
    </S.Container>
  );
};

export default Dashboard;
