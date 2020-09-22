import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const Th = styled.th`
  text-align: start;
  font-weight: 600;
  grid-column: 1fr;
  padding: 20px 10px;
`;
export const Td = styled.td`
  padding: 15px 10px;
`;
