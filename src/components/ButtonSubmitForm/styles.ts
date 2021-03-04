import styled, { keyframes } from 'styled-components';

import { lighten } from 'polished';

const move = keyframes`
  0%{
    right: 20px;
  }
  50%{
    right: 10px;
  }
  100%{
    right: 20px;
  }
`;

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }to{
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  margin-top: 10px;
  display: block;
  position: relative;
  padding: 0px;
  width: 100%;

  & > svg {
    opacity: 0;
    color: ${props => props.theme.icon.white};
    position: absolute;
    top: 50%;
    right: 5px;
    transition: all 0.3s;
    transform: translateY(-50%);
  }

  button {
    height: 50px;
    width: 100%;
    background-color: ${props => props.theme.button.background};
    color: ${props => props.theme.text.white};
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:disabled {
      opacity: 0.4;
      color: ${props => props.theme.text.white};
    }

    &:hover {
      background-color: ${lighten(0.1, '#212121')};
    }

    &:hover ~ svg {
      opacity: 1;
      animation: ${move} 1s infinite;
    }

    svg {
      margin: auto;
      color: ${props => props.theme.icon.white};
      animation: ${rotate} 0.7s infinite;
    }
  }
`;
