import styled from 'styled-components';
import Button from '../../Button';
import { appearFromTop } from '../../../styles/keyframs';

export const Container = styled.div`
  padding: 30px;
  animation: ${appearFromTop} 0.3s;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    span {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }

    svg {
      cursor: pointer;
    }
  }

  p {
    margin-top: 24px;
    font-size: 16px;
    font-weight: 400;
  }

  footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
  }
`;

export const Btn = styled(Button)`
  width: 170px;
  margin-left: 24px;
`;

export const BtnWhite = styled(Btn)`
  button {
    background: ${props => props.theme.theme.mainTheme};
    color: black;
    border: 1px solid black;

    &:hover {
      color: white;
    }
  }
`;
