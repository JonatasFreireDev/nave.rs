import styled from 'styled-components';
import Button from '../../components/Button';
import LoadingCircle from '../../components/LoadingCircle';

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
