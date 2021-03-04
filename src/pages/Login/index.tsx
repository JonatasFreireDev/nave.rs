import React, { useRef, useEffect } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/ButtonSubmitForm';
import * as S from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { signInUser } from '../../store/user.store';

interface SignUpFormData {
  email: string;
  senha: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<SignUpFormData> = async (
    data,
    { reset }
  ) => {
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

      dispatch(signInUser(data));

      reset();
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          // @ts-ignore: Unreachable code error
          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  useEffect(() => {
    if (user.status === 'fail') {
      // eslint-disable-next-line no-alert
      alert('Erro no Login');
    }
  }, [user]);

  return (
    <S.Container>
      <S.Login>
        <S.Logo />
        <Form ref={formRef} onSubmit={handleFormSubmit} noValidate>
          <Input type="email" label="E-mail" name="email" />
          <Input type="password" label="Senha" name="senha" />
          <Button type="submit">Entrar</Button>
        </Form>
      </S.Login>
    </S.Container>
  );
};

export default Login;
