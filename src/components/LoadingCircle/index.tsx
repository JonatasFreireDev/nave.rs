import React from 'react';

import { FaSpinner } from 'react-icons/fa';
import { AnyStyledComponent } from 'styled-components';

import Loader from './styles';

interface Loading {
  className?: AnyStyledComponent;
}

const LoadingCircle: React.FC<Loading> = ({ className }) => {
  return (
    <Loader className={className}>
      <FaSpinner />
    </Loader>
  );
};

export default LoadingCircle;
