import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-size: 20px;
  :hover {
    color: orangered;
  }
  ${
    '' /* &.active {`
    background-color: orangered;
    color: white;
  } */
  }

  ${
    '' /* :hover:not(.active),
  :focus-visible:not(.active) {
    color: orangered;
  } */
  }
`;
