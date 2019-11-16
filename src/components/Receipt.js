import React from "react";
import Box from "../components/Box";
import styled from "styled-components";
import Clock from "../components/icons/Clock";
import Rating from "../components/icons/Rating";
import NoImage from "../components/icons/NoImage";

const Title = styled("h2")`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #000000;
`;

const ImageWrapper = styled(Box)`
  height: 250px;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
`;
const Image = styled("img")`
  max-width: none;
  max-height: none;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const BottomText = styled("span")`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;

  letter-spacing: 0.75px;
  text-transform: lowercase;

  color: #000000;
`;
const ImageStubWrapper = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const BottomIcon = styled(Box)`
  margin-right: 6px;
`;

const getImage = receipt =>
  receipt.PictureUrls.length && receipt.PictureUrls[0].Normal;
export default ({ onSelect, receipt }) => {
  const image = getImage(receipt);
  return (
    <Box cursor="pointer" onClick={onSelect} mb="35px">
      <ImageWrapper mb="10px">
        <ImageStubWrapper>
          <NoImage/>
        </ImageStubWrapper>
        {image && <Image src={image}/>}
      </ImageWrapper>

      <Box display="flex" mb="10px" alignItems="center">
        <Box display="flex" alignItems="center" mr="20px">
          <BottomIcon>
            <Clock/>
          </BottomIcon>
          <BottomText>{receipt.PreparationTime.Description}</BottomText>
        </Box>

        <Box display="flex" mr="20px" alignItems="center">
          {receipt.EnergyAmounts.KcalPerPortion && <BottomIcon>
            <Rating/>
          </BottomIcon>
          && (
            <BottomText>{receipt.EnergyAmounts.KcalPerPortion} cals</BottomText>
          )}
        </Box>
      </Box>
      <Title>{receipt.Name}</Title>
    </Box>
  );
};
