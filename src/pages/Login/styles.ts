import styled from 'styled-components';
import LogoImg from '../../assets/logo.svg';
import { appearFromTop } from '../../styles/keyframs';

export const Container = styled.div`
  background: ${props => props.theme.theme.mainTheme};
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Login = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 410px;
  padding: 32px;
  border: 1px solid black;
  animation: ${appearFromTop} 0.7s;

  form {
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Logo = styled.img.attrs({
  src: LogoImg,
  alt: 'Logo',
})``;
