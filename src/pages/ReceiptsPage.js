import React, { useCallback } from "react";
import Box from "../components/Box";
import styled from "styled-components";
import Link from "../components/Link";
import Receipt from "../components/Receipt";
import NavBar from "../components/NavBar";
import { connect } from "react-redux";
import { navigateToRoute } from '../services/routes';
import { useHistory, useLocation } from 'react-router';
import Error, { SubTitle } from "../components/Error";

const ReceiptsLayout = styled(Box)`
  max-width: 340px;
  margin: 10px auto;
  width: 100%;
`;


const A = styled("a")`
  text-decoration: underline;
  cursor: pointer;
`;

export const ReceiptsPage = ({ receipts = [] }) => {
  const history = useHistory();
  const location = useLocation();

  const onSelectReceiptCallback = useCallback((receipt) => {
    navigateToRoute({
      to: '/receipt/' + receipt.Id,
      location,
      history
    });
  }, []);

  return (
    <Box
      display="flex"
      bg="white"
      flexDirection="column"
      height="0"
      minHeight="100%"
    >
      <NavBar title={"Recipes for you"} route={"/camera"}/>
      <Box height="100%" overflow="auto">
        {receipts.length === 0 ? (
          <Error title={'We are so sorry'}>
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
          </Error>
        ) : (
          <ReceiptsLayout>
            {receipts.map((receipt, i) => {
              return <Receipt onSelect={onSelectReceiptCallback} receipt={receipt} key={i}/>;
            })}
          </ReceiptsLayout>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ receipts }) => ({ receipts: receipts.data || [] });

export default connect(mapStateToProps, null)(ReceiptsPage);
