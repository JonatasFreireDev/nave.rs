import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }to{
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  margin: auto;
  font-size: 40px;
  height: 100%;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

export default Loader;
