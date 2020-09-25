import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
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
