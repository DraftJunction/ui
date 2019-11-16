import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import Revert from "../icons/Revert";
import Camera from "../icons/Camera";
import Check from "../icons/Check";
import Box from "../Box";

const CameraPanelStyled = styled("div")`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  background: #252525;
  box-shadow: 0px -4px 32px rgba(0, 0, 0, 0.12);
`;
const ControlIcon = styled(Box)`
pointer-events:  ${props => (props.disabled ? "none" : "all")}
 opacity: ${props => (props.disabled ? 0.5 : 1)}
 cursor:  ${props => (props.disabled ? "text" : "pointer")}
`;

export default ({ captured, onRevert, onAccept, onCapture }) => (
  <CameraPanelStyled>
    <ControlIcon disabled={!captured}>
      <IconButton onClick={onRevert}>
        <Revert height={32} width={32} fill="white" />
      </IconButton>
    </ControlIcon>
    <ControlIcon disabled={captured}>
      <IconButton onClick={onCapture}>
        <Camera height={32} width={32} fill="white" />
      </IconButton>
    </ControlIcon>
    <ControlIcon disabled={!captured}>
      <IconButton onClick={onAccept}>
        <Check height={32} width={32} fill="white" />
      </IconButton>
    </ControlIcon>
  </CameraPanelStyled>
);
