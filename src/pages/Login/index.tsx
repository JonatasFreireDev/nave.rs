import React, { useRef, useCallback } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as S from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { signInUser } from '../../store/user.store';
import getValidadtionErrors from '../../utils/getValidadtionErrors';

interface SignUpFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (data, { reset }) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Precisa ser um e-mail Válido')
            .required('Informe seu email'),
          senha: Yup.string().required('Informe sua senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await dispatch(signInUser(data))
          .then(unwrapResult)
          .then(() => {
            reset();
          })
          .catch(err => {
            throw new Error(err.message);
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidadtionErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          reset();
          toast.error(err.message);
        }
      }
    },
    [dispatch]
  );

  return (
    <S.Container>
      <S.Login>
        <S.Logo />
        <Form ref={formRef} onSubmit={handleFormSubmit} noValidate>
          <Input type="email" label="E-mail" name="email" autoFocus />
          <Input type="password" label="Senha" name="senha" />
          <Button isLoading={user.isLoading} type="submit">
            Entrar
          </Button>
        </Form>
      </S.Login>
    </S.Container>
  );
};

export default Login;
