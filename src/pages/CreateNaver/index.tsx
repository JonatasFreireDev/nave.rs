/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import React, { useRef, useCallback } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { MdNavigateBefore } from 'react-icons/md';
import { postNaverStore } from '../../store/navers.store';
import { useModal } from '../../hooks/ModalContext';
import Input from '../../components/Input';
import ModalInfo from '../../components/Modal/Info';
import * as S from './styles';
import getValidadtionErrors from '../../utils/getValidadtionErrors';
import { validationNaverYupForm } from '../../utils/validationYup';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';

interface SignUpFormData {
  name: string;
  birthdate: string;
  project: string;
  job_role: string;
  admission_date: string;
  url: string;
}

const NewNaver: React.FC = () => {
  const token = useAppSelector(state => state.user.data?.token!);
  const isLoading = useAppSelector(state => state.navers.isLoading);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { setContentModal } = useModal();

  const handleFormSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (data, { reset }) => {
      formRef.current?.setErrors({});
      try {
        await validationNaverYupForm(data);

        await dispatch(
          postNaverStore({
            dataForm: data,
            token,
          })
        )
          .then(unwrapResult)
          .then(() => {
            setContentModal(
              <ModalInfo
                title="Naver criado"
                customMessage="Naver criado com sucesso!"
              />
            );
            reset();
          })
          .catch(() => {
            throw new Error('Erro ao realizar o cadastro! ');
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
        }
      }
    },
    []
  );

  const goTo = useCallback(() => {
    history.goBack();
  }, [history]);

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
          <span>Adicionar Naver</span>
        </header>
        <Form ref={formRef} onSubmit={handleFormSubmit} noValidate>
          <section>
            <Input type="text" label="Nome" name="name" autoFocus />
            <Input type="text" label="Cargo" name="job_role" />
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
            <Input type="text" label="Projetos que participou" name="project" />
            <Input type="text" label="URL da foto do Naver" name="url" />
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
