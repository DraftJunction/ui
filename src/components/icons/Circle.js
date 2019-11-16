import styled, { keyframes } from "styled-components";
import React from "react";

const dash = keyframes`
 0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

const Circle = styled("circle")`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0px;
  stroke: currentColor;
`;

export default ({ width = 200, height = 200, fill = "#7EB941", ...props }) => (
  <svg
    viewBox="22 22 44 44"
    width={width}
    color={fill}
    height={height}
    {...props}
  >
    <Circle cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6" />
  </svg>
);
