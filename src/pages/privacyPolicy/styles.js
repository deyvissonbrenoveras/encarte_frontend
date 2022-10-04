import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    max-width: 800px;
    padding: 5px;
  }
  ul {
    list-style-type: circle !important;
  }
  p,
  h2 {
    margin-top: 20px;
  }
`;

export const Footer = styled.footer`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;
