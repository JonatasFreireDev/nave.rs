import React from 'react';

import { AnyStyledComponent } from 'styled-components';
import LoadingCircle from '../LoadingCircle';
import ErrorMessage from '../ErrorMessage';
import * as S from './styles';

interface LoadComponentProps {
  className?: AnyStyledComponent;
  isLoading?: boolean;
  isError?: string;
}

const LoadComponent: React.FC<LoadComponentProps> = ({
  isError,
  isLoading = false,
  children,
  className,
}) => {
  if (isLoading) {
    return (
      <S.Container className={className}>
        <LoadingCircle />
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container className={className}>
        <ErrorMessage message={isError} />
      </S.Container>
    );
  }

  return <>{children}</>;
};

export default LoadComponent;
