import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
`;
export const ProfileMenu = styled.div`
  display: ${(props) => (props.visibility ? 'block' : 'none')};
  position: absolute;
  top: 41px;
  right: -20px;
  background: #fff;
  width: 250px;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  background: #fcfcfc;
  &::before {
    content: '';
    position: absolute;
    right: 18px;
    top: -13px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid rgba(0, 0, 0, 0.09);
  }
  button {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 15px;
    background: #fcfcfc;
    border: 0;
    &:hover {
      background: ${darken(0.03, '#fcfcfc')};
    }
    svg {
      color: #000;
      font-size: 24px;
      margin-right: 5px;
    }
  }
`;
