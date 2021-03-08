import styled from 'styled-components';
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
`;
