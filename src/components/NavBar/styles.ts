import styled from 'styled-components';
import LogoImg from '../../assets/logo.svg';

export const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 85px;

  button {
    border: none;
    background: transparent;
    font-weight: 600;
    margin: 24px 32px;
    cursor: pointer;
  }
`;

export const Logo = styled.img.attrs({
  src: LogoImg,
  alt: 'Logo',
})`
  max-width: 145px;
  margin: 24px 32px;
`;
