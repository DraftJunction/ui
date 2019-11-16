import Box from "./Box";
import Link from "./Link";
import React from "react";
import styled from "styled-components";
import Back from "./icons/Back";
const NavBar = styled(Box)`
  height: 54px;
  left: 0px;
  z-index: 1;
  top: 0px;
  align-items: center;
  display: flex;
  width: 100%;
  background: #ffffff;
  position: sticky;
  box-shadow: 0px 2px 24px rgba(0, 0, 0, 0.12);
`;

const StyledBack = styled(Back)`
  cursor: pointer;
`;
const NavTitle = styled("h1")`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  /* identical to box height, or 100% */

  letter-spacing: 0.75px;

  color: #000000;
`;

export default ({ route, title }) => (
  <NavBar>
    <Box display="flex" alignItems="center">
      <Link to={route}>
        {({ onClick }) => {
          return <StyledBack onClick={onClick} />;
        }}
      </Link>
      <NavTitle>{title}</NavTitle>
    </Box>
  </NavBar>
);
