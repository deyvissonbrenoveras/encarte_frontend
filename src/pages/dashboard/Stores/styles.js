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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  li {
    flex-grow: 1;
    width: 250px;
    margin: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    font-size: 16px;
    height: 72px;

    &:hover {
      background: ${darken(0.03, '#fff')};
    }
    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin: 0 10px;
    }
    a {
      color: #000;
      text-overflow: ellipsis;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;
