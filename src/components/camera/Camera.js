import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CameraPanel from "./CameraPanel";
import { connect } from "react-redux";
import { loadReceipts } from "../../store/receipts";
import { makeReceiptsRequest } from "../../services/receipts";
import { getConstraints } from "../../services/media";
import Box from "../Box";

const CameraWrapperStyled = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const CanvasStyled = styled("canvas")`
  width: 100%;
  height: 100%;
`;

const StyledVideo = styled("video")`
  position: absolute;
  height: 100%;
  width: 100%;

  top: 0;
  left: 0;
`;
const Camera = ({ loadReceipts, loading }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const blobRef = useRef(null);
  const [camerasStr, setCamerasStr] = useState("");
  const videoCaptureRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const onAcceptCallback = useCallback(() => {
    loadReceipts(makeReceiptsRequest(blobRef.current));
  }, [loadReceipts]);
  const onRevertCallback = useCallback(() => {
    setCaptured(false);
    proccessCapturing();
  }, []);

  const onCaptureCallback = useCallback(() => {
    setCaptured(true);
    videoCaptureRef.current
      .takePhoto()
      .then(blob => {
        blobRef.current = blob;
        return createImageBitmap(blob);
      })
      .then(imageBitmap => {
        drawCanvas(canvasRef.current, imageBitmap);
      })
      .catch(error => {
        //todo: log smth
      });
  }, [setCaptured, videoCaptureRef]);
  // useEffect(async () => {
  //   const cameras = await getCameras();
  //   setCamerasStr(JSON.stringify(cameras)
  //   )
  // }, [])
  const proccessCapturing = useCallback(async () => {
    const constraints = await getConstraints();
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;
        const track = mediaStream.getVideoTracks()[0];
        try {
          videoCaptureRef.current = new ImageCapture(track);
        } catch (e) {
          console.log(e);
        }
      })
      .catch(error => {
        //todo log smth
      });
  });
  useEffect(() => {
    proccessCapturing();
  }, []);

  /* Utils */

  const drawCanvas = useCallback((canvas, img) => {
    canvas.width = getComputedStyle(canvas).width.split("px")[0];
    canvas.height = getComputedStyle(canvas).height.split("px")[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas
      .getContext("2d")
      .drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * ratio,
        img.height * ratio
      );
  }, []);

  return (
    <CameraWrapperStyled>
      {/*<Box position="absolute"*/}
      {/*     bg="white"*/}
      {/*     width="100%"*/}
      {/*     zIndex="1"*/}
      {/*>{camerasStr}</Box>*/}
      <Box flexBasis="100%" position="relative">
        {!captured && (
          <StyledVideo loop muted playsInline={true} autoPlay ref={videoRef} />
        )}
        {captured && <CanvasStyled ref={canvasRef} />}
      </Box>
      <CameraPanel
        disabled={loading}
        captured={captured}
        onAccept={onAcceptCallback}
        onRevert={onRevertCallback}
        onCapture={onCaptureCallback}
      ></CameraPanel>
    </CameraWrapperStyled>
  );
};
const mapStateToProps = ({ receipts }) => ({ loading: receipts.loading });
export default connect(mapStateToProps, {
  loadReceipts
})(Camera);
