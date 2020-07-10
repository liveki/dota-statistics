import styled from 'styled-components';
import { shade } from 'polished';
import backgroundImg from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  img {
    margin-bottom: 200px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      margin-bottom: 10px;
      padding-left: 5px;
      border: 0;
      border-radius: 5px;

      height: 44px;
      width: 240px;

      font-style: italic;
      color: #fff;
      background: #7e7e7e;

      &::placeholder {
        color: #d4d4d4;
        text-align: center;
      }
    }

    button {
      border: 0;
      border-radius: 5px;

      height: 44px;
      width: 240px;

      background: #7b1715;
      color: #fff;

      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#7b1715')};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImg}) no-repeat center;
  background-size: cover;
`;
