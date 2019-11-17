import React, { useEffect, useState } from "react";
import Box from "../components/Box";
import Link from "../components/Link";
import styled from "styled-components";
import Camera from "../components/icons/Camera";

const Title = styled("h1")`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 72px;
  line-height: 84px;
  text-align: center;
  color: #ffffff;
`;

const SubTitle = styled("h3")`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.5px;

  color: #ffffff;

  opacity: 0.85;
`;
const CameraIcon = styled(Box)`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

const WrapperStyled = styled(Box)`
  position: relative;
  height: 100%;
  background: linear-gradient(330.64deg, #498021 0%, #8cc84c 100%);
`;
const BottomPanelStyled = styled(Box)`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background: linear-gradient(124.56deg, #ffffff 0%, #f2f2f2 100%);
  box-shadow: 0px -4px 32px rgba(0, 0, 0, 0.12);
  border-radius: 42px 42px 0px 0px;
`;
const ContinueButton = styled("button")`
  text-transform: uppercase;
  background: linear-gradient(98.33deg, #86c445 0%, #619831 100%);
  border-radius: 200px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  width: 100%;
  padding: 18px 30px;
  position: relative;
  text-align: center;
  width: 100%;
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #ffffff;
`;
const BottomText = styled("p")`
  margin-bottom: 20px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #000000;
`;

export default () => {
  const [cameraSupported, setCameraSupported] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setCameraSupported(true);
      })
      .catch(error => setError(error));
  }, []);

  return (
    <React.Fragment>
      <WrapperStyled>
        <Box display="flex" height="100%" flexDirection="column">
          <Box mt="100px">
            <Title>Draft</Title>
            <SubTitle>the solution to your grocery frustration</SubTitle>
          </Box>
          <BottomPanelStyled>
            <BottomText>
              Come to the store and take a photo of the products you like, Draft
              will do the planning.
            </BottomText>
            <Box textAlign="center">
              {cameraSupported && (
                <Link to={"/camera"}>
                  {({ onClick }) => {
                    return (
                      <ContinueButton onClick={onClick}>
                        <CameraIcon>
                          <Camera width={32} height={32} fill="white" />
                        </CameraIcon>
                        CONTINUE
                        <span />
                      </ContinueButton>
                    );
                  }}
                </Link>
              )}
            </Box>
          </BottomPanelStyled>
        </Box>
      </WrapperStyled>
    </React.Fragment>
  );
};
