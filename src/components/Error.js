import React from "react";
import Box from "./Box";
import SadSmile from "./icons/SadSmile";
import styled from "styled-components";


const Title = styled("h1")`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 50px;
  text-align: center;
  margin-bottom: 20px;
  color: black;
`;


export const SubTitle = styled("h3")`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.5px;
  color: black;

  opacity: 0.85;
`;


export default ({ title, description, children }) => {
  return (
    <React.Fragment>
      <Box
        margin="0 10px"
        display="flex"
        height="100%"
        justifyContent="center"
        flexDirection="column"
      >
        <Box mb="25px">
          <Title>{title}</Title>
          {description && <SubTitle>{description}</SubTitle>}
          {children}
        </Box>
        <Box textAlign="center">
          <SadSmile/>
        </Box>
      </Box>
    </React.Fragment>
  );
};
