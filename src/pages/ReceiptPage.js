import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchReceipt } from "../services/receipts";
import NavBar from "../components/NavBar";
import Box from "../components/Box";
import styled from "styled-components";
import Receipt from '../components/Receipt';
import Error, { SubTitle } from "../components/Error";

const ReceiptLayout = styled(Box)`
  max-width: 340px;
  margin: 10px auto;
  width: 100%;
`;


export const ReceiptPage = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReceipt(id).then(receipt => setReceipt(receipt))
      .catch((err) => {
        setError(err)
      })
  }, [id]);

  return <Box
    display="flex"
    bg="white"
    flexDirection="column"
    height="0"
    minHeight="100%"
  >
    <NavBar title={"Recipes for you"} route={"/receipts"}/>
    <Box height="100%" overflow="auto">
      {error && <Error title={'We are so sorry,'}>
        <SubTitle>but we are experiencing problems with getting your reciept. Please try again later.</SubTitle>
      </Error>}

      <ReceiptLayout>
        <Receipt receipt={receipt}></Receipt>
      </ReceiptLayout>
    </Box>
  </Box>
};
