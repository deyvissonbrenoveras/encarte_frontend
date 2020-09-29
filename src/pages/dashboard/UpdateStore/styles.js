import styled from 'styled-components';
import { lg } from '../../../styles/mediaQueries';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
  }
`;
export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (${lg}) {
    flex-direction: row;
  }
`;
export const ProductsArea = styled.div`
  width: 100%;
  padding: 10px;
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

export const ProductImage = styled.img`
  max-width: 64px;
  max-height: 64px;
`;
