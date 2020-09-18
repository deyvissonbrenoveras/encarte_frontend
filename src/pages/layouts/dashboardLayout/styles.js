import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100vh;
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50px;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 5px;
  img {
    width: 130px;
  }
`;
export const HeaderOptions = styled.ul`
  display: flex;
  font-size: 24px;
  > li {
    margin: 0 10px;
  }
  svg {
    color: var(--primary-color);
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  height: calc(100% - 55px);
  overflow: hidden;
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
  overflow-y: scroll;
  margin: 0 5px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  padding: 10px;
  form {
    display: flex;
    flex-direction: column;
    label {
      font-size: 15px;
      margin-top: 10px;
    }
    input {
      width: 100%;
      max-width: 600px;
      margin-top: 3px;
      padding: 5px 10px;
      border-radius: 5px;
      border: 0;
      background: rgba(0, 0, 0, 0.06);
    }
  }
`;
