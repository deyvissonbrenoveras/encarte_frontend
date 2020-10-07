import styled from 'styled-components';
import { sm } from '../../../styles/mediaQueries';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  @media (${sm}) {
    flex-direction: row;
    align-items: center;
  }
`;