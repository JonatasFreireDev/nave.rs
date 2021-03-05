import styled from 'styled-components';
import { appearFromRight } from '../../styles/keyframs';
import Button from '../../components/Button';

export const Container = styled.div`
  background: ${props => props.theme.theme.mainTheme};
  height: calc(90vh - 85px);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${appearFromRight} 1s;

  @media (max-width: 600px) {
    & {
      height: 100%;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 32px;

  header {
    display: flex;
    align-items: center;
    width: 100%;

    span {
      margin-left: 10px;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }

    svg {
      cursor: pointer;
    }
  }

  form {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div {
      width: 170px;
      align-self: flex-end;
    }

    section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;

      @media (max-width: 600px) {
        & {
          flex-direction: column;
        }
        & div:last-child {
          margin-left: 0px !important;
        }
      }

      div {
        max-width: 300px;
      }

      div:last-child {
        margin-left: 32px;
      }
    }
  }
`;

export const Btn = styled(Button)``;
