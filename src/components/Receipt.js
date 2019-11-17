import React from "react";
import Box from "../components/Box";
import styled from "styled-components";
import Clock from "../components/icons/Clock";
import Rating from "../components/icons/Rating";
import NoImage from "../components/icons/NoImage";
import { getIngredients } from "../pages/ReceiptPage";
import Refrigerator from "../components/icons/Refrigerator";
const RefrigeratorStyled = styled(Refrigerator)`
  margin-right: 6px;
`;
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
const getHealth = receipt =>
  receipt.HealthRating > 0.15
    ? "red"
    : receipt.HealthRating > 0.1
    ? "yellow"
    : "#7EB941";
export const existHome = (receipt) => {
   const ingr = getIngredients(receipt);
   return ingr.some(x => x.RecentlyBought);
}
export default ({ onSelect, receipt, ...props }) => {
  const image = receipt && getImage(receipt);
  const health = receipt && getHealth(receipt);

  return receipt ? (
    <Box cursor="pointer" onClick={() => onSelect(receipt)} {...props}>
      <ImageWrapper mb="10px">
        <ImageStubWrapper>
          <NoImage/>
        </ImageStubWrapper>
        {image && <Image src={image}/>}
      </ImageWrapper>

      <Box
        display="flex"
        mb="10px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" mr="20px">
            <BottomIcon>
              <Clock/>
            </BottomIcon>
            <BottomText>{receipt.PreparationTime.Description}</BottomText>
          </Box>

          <Box display="flex" mr="20px" alignItems="center">
            {receipt.EnergyAmounts.KcalPerPortion && (
              <React.Fragment>
                <BottomIcon>
                  <Rating/>
                </BottomIcon>
                <BottomText>
                  {receipt.EnergyAmounts.KcalPerPortion} cals
                </BottomText>
              </React.Fragment>
            )}
          </Box>
        </Box>
        <Box display="flex"
        alignItems="center">
          {existHome(receipt) && <RefrigeratorStyled/>}
          <Box
            width="18px"
            height="18px"
            borderRadius="50%"
            bg={health}
          ></Box>
        </Box>
      </Box>
      <Title>{receipt.Name}</Title>
    </Box>
  ) : null;
};
