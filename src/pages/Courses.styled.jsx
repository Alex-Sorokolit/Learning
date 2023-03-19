import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const Item = styled.li`
  transition: transform 0.3s ease-in-out;
  &:hover,
  &:focus {
    transform: scale(1.01);
  }
`;
