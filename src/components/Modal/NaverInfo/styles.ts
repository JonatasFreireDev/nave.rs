import styled from 'styled-components';
import { appearFromTop } from '../../../styles/keyframs';

interface NaverImage {
  src?: string;
}

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 500px;
  justify-content: center;
  animation: ${appearFromTop} 0.3s;

  & > svg {
    cursor: pointer;
    position: absolute;
    margin-top: -10px;
    margin-right: -10px;
  }

  section {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 30px;

    & > svg {
      cursor: pointer;
      position: absolute;
      margin: 21px;
      top: 0;
      right: 0;
    }

    div {
      header {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      h4 {
        margin-top: 24px;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      span {
        font-size: 16px;
        font-weight: 400;
      }

      svg {
        cursor: pointer;

        &:last-child {
          margin-left: 16px;
        }
      }
    }
  }
`;

export const Image = styled.div<NaverImage>`
  background: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
