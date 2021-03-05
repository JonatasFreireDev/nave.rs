import styled from 'styled-components';
import Button from '../../components/Button';
import LoadingCircle from '../../components/LoadingCircle';
import { appearFromNothing } from '../../styles/keyframs';

export const Container = styled.div`
  display: flex;
  margin: 32px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.theme.mainTheme};

  h2 {
    text-align: center;
    margin: auto;
    padding: 100px;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    span {
      font-size: 40px;
      font-weight: 600;
      text-align: center;
    }
  }
`;

export const ButtonNaver = styled(Button)`
  margin: 0;
  width: 176px;
  font-weight: 600;
`;

export const Loading = styled(LoadingCircle)`
  height: 50vh !important;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  animation: ${appearFromNothing} 0.5s;
`;

export const Naver = styled.section`
  display: grid;
  grid-template-rows: 300px 5px 5px 20px;
  grid-template-columns: 300px;
  grid-gap: 20px;
  margin: 20px;

  img {
    width: 100%;
  }

  strong {
    font-size: 16px;
    font-weight: 600;
  }

  span {
    font-size: 16px;
    font-weight: 400;
  }

  div {
    svg {
      cursor: pointer;

      &:last-child {
        margin-left: 10px;
      }
    }
  }
`;
