import React from 'react';

import { VscLoading } from 'react-icons/vsc';
import { AnyStyledComponent } from 'styled-components';

import Loader from './styles';

interface Loading {
  className?: AnyStyledComponent;
}

const LoadingCircle: React.FC<Loading> = ({ className }) => {
  return (
    <Loader className={className}>
      <VscLoading />
    </Loader>
  );
};

export default LoadingCircle;
