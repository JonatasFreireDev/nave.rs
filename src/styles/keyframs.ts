import { keyframes } from 'styled-components';

export const appearFromRight = keyframes`
from{
  opacity: 0;
  transform: translateX(-50px);
}to{
  opacity: 1;
  transform: translateX(0px);
}`;

export const appearFromTop = keyframes`
from{
  opacity: 0;
  transform: translateY(-50px);
}to{
  opacity: 1;
  transform: translateY(0px);
}`;
