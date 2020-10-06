import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;
  img {
    width: 80%;
    max-width: 200px;
    align-self: center;
    margin-bottom: 15px;
  }
  form {
    display: flex;
    flex-direction: column;
    input {
      margin-top: 5px;
      padding: 5px 10px;
      border-radius: 5px;
      border: 0;
      background: rgba(0, 0, 0, 0.06);
    }
    span {
      color: #e63630;
      font-size: 14px;
      margin: 5px 0 0;
      align-self: flex-start;
    }
    button {
      color: #fff;
      margin-top: 15px;
      border: 0;
      background: var(--primary-color);
      padding: 10px;
      border-radius: 15px;
    }
  }
  a {
    align-self: center;
    margin-top: 10px;
  }
`;
