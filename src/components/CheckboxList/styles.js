import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin: 10px 0;
  border: 1px solid #e3e3e3;
  overflow-y: scroll;
  padding: 5px;
  ul {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2px;
    li {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100px;
      padding: 5px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      img {
        padding: 5px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #e3e3e3;
        object-fit: contain;
      }
      div {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        label {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      }
    }
  }
`;
