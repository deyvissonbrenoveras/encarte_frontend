import styled from 'styled-components';
import { VscLoading } from 'react-icons/vsc';

export const Container = styled.div`
  margin: 10px auto;
  display: flex;
  align-items: center;
  font-size: 16px;
  span {
    animation-name: color;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;

    @keyframes color {
      0% {
        color: #000;
      }
      100% {
        color: #dbdbdb;
      }
    }
  }
`;

export const Icon = styled(VscLoading)`
  font-size: 25px;
  color: var(--primary-color);
  margin-right: 10px;
  animation-name: spin;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
  animation-direction: normal;
  @keyframes spin {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;
