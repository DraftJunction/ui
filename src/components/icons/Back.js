import React from "react";

export default ({ width = 38, height = 38, fill = "#7EB941", ...props }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.5834 9.38867L10.972 19L20.5834 28.6113L22.9584 26.2363L15.722 19L22.9584 11.7637L20.5834 9.38867Z"
      fill={fill}
    />
  </svg>
);
