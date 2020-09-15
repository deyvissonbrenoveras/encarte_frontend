import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 15px;
  h2 {
    font-size: 30px;
    text-align: center;
  }
`;

export const StoreList = styled.ul`
  margin-top: 15px;
  li {
    padding: 10px;
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
      background: ${darken(0.03, '#fff')};
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin: 0 10px;
    }
    font-size: 25px;
    height: 72px;
  }
`;
