import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 0;
  label {
    cursor: pointer;

    img,
    svg {
      color: #e3e3e3;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
      display: block;
      width: 100%;
      height: 100%;
      max-width: 200px;
      max-height: 200px;
      &:hover {
        opacity: 0.7;
      }
    }
    input {
      display: none;
    }
  }
`;
