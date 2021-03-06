/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
import React, { useRef, useCallback, useState } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { MdNavigateBefore } from 'react-icons/md';
import { postNaverAPI } from '../../store/navers.store';
import { useModal } from '../../hooks/ModalContext';
import Input from '../../components/Input';
import ModalInfo from '../../components/Modal/Info';
import * as S from './styles';
import getValidadtionErrors from '../../utils/getValidadtionErrors';
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
  const token = useAppSelector(state => state.user.data?.token);
  const isLoading = useAppSelector(state => state.navers.isLoading);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { openModal, setContentModal } = useModal();

  const handleFormSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (data, { reset }) => {
      formRef.current?.setErrors({});
      try {
        const reg = new RegExp(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
        const schema = Yup.object().shape({
          name: Yup.string().required('Informe o nome'),
          birthdate: Yup.string()
            .required('Informe sua data de nascimento')
            .matches(reg, 'Informe o formato correto(dd/mm/yyyy)'),
          project: Yup.string().required('Informe os projetos'),
          job_role: Yup.string().required('Informe o trabalho'),
          admission_date: Yup.string()
            .required('Informe a data de admissao')
            .matches(reg, 'Informe o formato correto(dd/mm/yyyy)'),
          url: Yup.string()
            .required('Insira uma url de uma foto')
            .min(4, 'minimo 4 characteres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await dispatch(
          postNaverAPI({
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
            openModal();
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
          openModal();
        }
      }
    },
    [token]
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
