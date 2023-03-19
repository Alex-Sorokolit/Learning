import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const GoBackBtn = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: black;
  font-size: 30px;
  padding: 10px 30px;

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
