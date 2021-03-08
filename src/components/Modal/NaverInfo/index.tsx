import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdEdit, MdDelete, MdClose } from 'react-icons/md';
import { parseISO, differenceInCalendarYears } from 'date-fns';
import { useAppSelector } from '../../../hooks/reduxHook';
import { getNaverAPI } from '../../../services/naverService';
import { useModal } from '../../../hooks/ModalContext';
import ConfirmExclude from '../ConfirmExclude';
import * as S from './styles';
import { INaver } from '../../../Interface/INavers';
import LoadComponent from '../../LoadComponent';

interface IModalProps {
  idNaver: string;
}

const NaverInfo: React.FC<IModalProps> = ({ idNaver }) => {
  const token = useAppSelector(state => state.user.data?.token!);
  const history = useHistory();
  const { closeModal, setContentModal } = useModal();
  const [thisNaver, setThisNaver] = useState<INaver>();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getNaver();
  }, []);

  const getNaver = useCallback(async () => {
    const responseThisNaver = await getNaverAPI({ id: idNaver, token });

    if (responseThisNaver) {
      setThisNaver(responseThisNaver);
    }

    setisLoading(false);
  }, [idNaver]);

  const deleteNaver = useCallback((id: string) => {
    setContentModal(<ConfirmExclude idNaver={id} />);
  }, []);

  const goTo = useCallback((path: string) => {
    history.push(path);
  }, []);

  const getDiferenceInYears = useCallback((date: string): number => {
    const birth = parseISO(date);
    return differenceInCalendarYears(new Date(), birth);
  }, []);

  return (
    <LoadComponent isLoading={isLoading}>
      <S.Container>
        <S.Image src={thisNaver?.url} />
        <section>
          <MdClose
            size={20}
            onClick={() => {
              closeModal();
            }}
          />
          <div>
            <header>{thisNaver?.name}</header>
            <span>{thisNaver?.job_role}</span>

            <h4>Idade</h4>
            <span>{`${getDiferenceInYears(thisNaver?.birthdate!)} anos`}</span>

            <h4>Tempo de empresa</h4>
            <span>
              {`${getDiferenceInYears(thisNaver?.admission_date!)} anos`}
            </span>

            <h4>Projetos que participou</h4>
            <span>{thisNaver?.project}</span>
          </div>
          <div>
            <MdDelete
              size={20}
              onClick={() => {
                deleteNaver(thisNaver!.id);
              }}
            />
            <MdEdit
              size={20}
              onClick={() => {
                closeModal();
                goTo(`/updateNaver/${thisNaver!.id}`);
              }}
            />
          </div>
        </section>
      </S.Container>
    </LoadComponent>
  );
};

export default NaverInfo;
