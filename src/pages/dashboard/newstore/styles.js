import styled from 'styled-components';

export const Container = styled.div`
  button {
    border-radius: 3px;
    color: #fff;
    background: #37ad5d;
    margin-top: 10px;
    padding: 10px 5px;
    border: 0;
  }
`;

export const ImageInputs = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  > div {
    width: 250px;
  }
`;
