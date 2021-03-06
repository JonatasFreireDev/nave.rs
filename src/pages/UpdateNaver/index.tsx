/* eslint-disable import/no-duplicates */
/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import React, { useRef, useCallback, useEffect, useState } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory, useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { MdNavigateBefore } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { putNaverAPI } from '../../store/navers.store';
import { useModal } from '../../hooks/ModalContext';
import Input from '../../components/Input';
import ModalInfo from '../../components/Modal/Info';
import * as S from './styles';
import getValidadtionErrors from '../../utils/getValidadtionErrors';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import { getNaverAPI } from '../../utils/getDataFromApi';
import { INaver } from '../../Interface/INavers';

interface SignUpFormData {
  name: string;
  birthdate: string;
  project: string;
  job_role: string;
  admission_date: string;
  url: string;
}

interface RouteParams {
  id: string;
}

const NewNaver: React.FC = () => {
  const token = useAppSelector(state => state.user.data?.token);
  const isLoading = useAppSelector(state => state.navers.isLoading);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const { openModal, setContentModal } = useModal();
  const [thisNaver, setThisNaver] = useState<INaver>();

  useEffect(() => {
    getNaver();
  }, []);

  const getNaver = useCallback(async () => {
    const responseThisNaver = await getNaverAPI({ id, token });

    if (responseThisNaver) setThisNaver(responseThisNaver);

    formRef.current?.setFieldValue(
      'birthdate',
      formatDate(responseThisNaver?.birthdate)
    );
    formRef.current?.setFieldValue(
      'admission_date',
      formatDate(responseThisNaver?.admission_date)
    );
  }, [id]);

  const handleFormSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        const reg = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
        const schema = Yup.object().shape({
          name: Yup.string().required('Informe o nome'),
          birthdate: Yup.string().matches(
            reg,
            'Informe o formato correto(dd/mm/yyyy)'
          ),
          project: Yup.string(),
          job_role: Yup.string(),
          admission_date: Yup.string().matches(
            reg,
            'Informe o formato correto(dd/mm/yyyy)'
          ),
          url: Yup.string().min(4, 'minimo 4 characteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await dispatch(
          putNaverAPI({
            id,
            dataForm: data,
            token,
          })
        )
          .then(unwrapResult)
          .then(() => {
            setContentModal(
              <ModalInfo
                title="Naver atualizado"
                customMessage="Naver atualizado com sucesso!"
              />
            );
            openModal();
          })
          .catch(err => {
            throw new Error('Erro ao atualizar o Naver! ');
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidadtionErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          setContentModal(
            <ModalInfo
              title="Ocorreu algum erro !"
              customMessage={err.message}
            />
          );
          openModal();
        }
      }
    },
    [token]
  );

  const goTo = useCallback(() => {
    history.goBack();
  }, [history]);

  const formatDate = useCallback(
    date => {
      const toDate = parseISO(date);
      return format(toDate, 'dd/MM/yyyy', {
        locale: ptBR,
      });
    },
    [thisNaver]
  );

  return (
    <S.Container>
      <S.Content>
        <header>
          <MdNavigateBefore
            size={40}
            onClick={() => {
              goTo();
            }}
          />
          <span>Editar Naver</span>
        </header>
        <Form ref={formRef} onSubmit={handleFormSubmit} noValidate>
          <section>
            <Input
              type="text"
              label="Nome"
              name="name"
              autoFocus
              defaultValue={thisNaver?.name}
            />
            <Input
              type="text"
              label="Cargo"
              name="job_role"
              defaultValue={thisNaver?.job_role}
            />
          </section>
          <section>
            <Input type="text" label="Data de Nascimento" name="birthdate" />
            <Input
              type="text"
              label="Data de Adimissao da empresa"
              name="admission_date"
            />
          </section>
          <section>
            <Input
              type="text"
              label="Projetos que participou"
              name="project"
              defaultValue={thisNaver?.project}
            />
            <Input
              type="text"
              label="URL da foto do Naver"
              name="url"
              defaultValue={thisNaver?.url}
            />
          </section>
          <S.Btn isLoading={isLoading} type="submit">
            Salvar
          </S.Btn>
        </Form>
      </S.Content>
    </S.Container>
  );
};

export default NewNaver;
