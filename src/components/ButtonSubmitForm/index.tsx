import React, { ButtonHTMLAttributes } from 'react';

import { IconType } from 'react-icons';
import { VscLoading } from 'react-icons/vsc';

import * as S from './styles';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  Icon?: IconType;
}

const ButtonSubmitForm: React.FC<Button> = ({
  Icon,
  isLoading = false,
  type = 'button',
  children,
  ...rest
}) => {
  return (
    <S.Container>
      <button type={type} disabled={isLoading} {...rest}>
        {isLoading ? <VscLoading size="35" /> : children}
      </button>
      {Icon ? <Icon size="22" /> : ''}
    </S.Container>
  );
};

export default ButtonSubmitForm;
