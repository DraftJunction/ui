import React from "react";
import Box from "../components/Box";
import Circle from "../components/icons/Circle";
import styled from "styled-components";
import { connect } from "react-redux";
import Camera from "../components/camera/Camera";

const LoaderWrapper = styled(Box)`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
`;

const Loading = (...props) => {
  return (
    <LoaderWrapper {...props}>
      <Circle />
    </LoaderWrapper>
  );
};

const CameraPage = ({ loading }) => {
  return (
    <Box position="relative" height="100%">
      {loading && <Loading />}
      <Camera />
    </Box>
  );
};

const mapStateToProps = ({ receipts }) => ({
  loading: receipts.loading
});

export default connect(mapStateToProps)(CameraPage);
