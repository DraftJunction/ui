import React from "react";
import Box from "../components/Box";
import styled from "styled-components";
import SadSmile from "../components/icons/SadSmile";
import Link from "../components/Link";
import Receipt from "../components/Receipt";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";

const ReceiptsLayout = styled(Box)`
  max-width: 340px;
  margin: 10px auto;
  width: 100%;
`;

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

const SubTitle = styled("h3")`
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

const A = styled("a")`
  text-decoration: underline;
  cursor: pointer;
`;
const NoReceipts = () => {
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
          <Title>We are so sorry,</Title>
          <SubTitle>
            but we didn't find any receipts for you, please give us a chance and{" "}
            <Link to={"/camera"}>
              {({ onClick }) => {
                return (
                  <A
                    onClick={e => {
                      e.preventDefault();
                      onClick(e);
                    }}
                  >
                    try again
                  </A>
                );
              }}
            </Link>
          </SubTitle>
        </Box>
        <Box textAlign="center">
          <SadSmile />
        </Box>
      </Box>
    </React.Fragment>
  );
};
export const ReceiptsPage = ({ receipts = [] }) => {
  return (
    <Box
      display="flex"
      bg="white"
      flexDirection="column"
      height="0"
      minHeight="100%"
    >
      <NavBar title={"Recipes for you"} route={"/camera"} />
      <Box height="100%" overflow="auto">
        {receipts.length === 0 ? (
          <NoReceipts />
        ) : (
          <ReceiptsLayout>
            {receipts.map((receipt, i) => {
              return <Receipt receipt={receipt} key={i} />;
            })}
          </ReceiptsLayout>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ receipts }) => ({ receipts: receipts.data || [] });

export default connect(mapStateToProps, null)(ReceiptsPage);
