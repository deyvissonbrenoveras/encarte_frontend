import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
`;
export const Header = styled.header`
  height: 50px;
  background: #f0f0f0;
`;
export const Container = styled.div`
  display: flex;
  height: 100%;
`;
export const Drawer = styled.div`
  background: #424242;
  flex-grow: 0.15;
  height: 100%;
  color: #fff;
  ul {
    margin-top: 20px;
    li {
      font-size: 18px;
      &:hover {
        cursor: pointer;
        background: ${lighten(0.1, '#424242')};
      }
      svg {
        margin: 0 10px;
      }
      a {
        padding: 10px;
        display: flex;
        width: 100%;
        color: #fff;
      }
    }
  }
`;
export const Content = styled.div`
  flex-grow: 1;
`;
