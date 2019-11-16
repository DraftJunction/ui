import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CameraPanel from "./CameraPanel";
import { connect } from "react-redux";
import { loadReceipts } from "../../store/receipts";
import { makeReceiptsRequest } from "../../services/receipts";

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
const Camera = ({ loadReceipts }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const blobRef = useRef(null);

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
  const proccessCapturing = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(mediaStream => {
        videoRef.current.srcObject = mediaStream;
        const track = mediaStream.getVideoTracks()[0];
        console.log(videoCaptureRef.current, "videoCaptureRef.current");
        try {
          videoCaptureRef.current = new ImageCapture(track);
        } catch (e) {
          console.log(e);
        }
        console.log(videoCaptureRef.current, "videoCaptureRef.current");
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
      {!captured && (
        <video
          loop
          muted
          playsInline={true}
          width="100%"
          height="100%"
          autoPlay
          ref={videoRef}
        />
      )}
      {captured && <CanvasStyled ref={canvasRef} />}
      <CameraPanel
        captured={captured}
        onAccept={onAcceptCallback}
        onRevert={onRevertCallback}
        onCapture={onCaptureCallback}
      ></CameraPanel>
    </CameraWrapperStyled>
  );
};

export default connect(null, {
  loadReceipts
})(Camera);
