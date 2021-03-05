import styled from 'styled-components';

export const Container = styled.div`
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
