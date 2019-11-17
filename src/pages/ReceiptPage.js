import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchReceipt } from "../services/receipts";
import NavBar from "../components/NavBar";
import Box from "../components/Box";
import styled from "styled-components";
import Receipt from "../components/Receipt";
import Error, { SubTitle } from "../components/Error";
import Refrigerator from "../components/icons/Refrigerator";
const RefrigeratorStyled = styled(Refrigerator)`
  margin-right: 6px;
`;
const ReceiptLayout = styled(Box)`
  max-width: 340px;
  margin: 10px auto;
  width: 100%;
`;
const ReceiptDescription = styled("h3")`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  /* or 150% */
  margin-bottom: 10px;
  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #000000;
`;
const Ingredient = styled(Box)`
  font-family: Roboto;

  font-size: 12px;
  /* or 150% */

  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #000000;
`;

const Amount = styled(Box)`
  font-weight: bold;
  color: #7eb941;
`;

export const getIngredients = receipt => {
  return (receipt.Ingredients || []).flatMap(x =>
    (x.SubSectionIngredients || []).flatMap(x => x)
  );
};

export const ReceiptPage = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);
  const ingredients = receipt && getIngredients(receipt);

  useEffect(() => {
    fetchReceipt(id)
      .then(receipt => setReceipt(receipt))
      .catch(err => {
        setError(err);
      });
  }, [id]);

  return receipt ? (
    <Box
      display="flex"
      bg="white"
      flexDirection="column"
      height="0"
      minHeight="100%"
    >
      <NavBar title={"Recipes for you"} route={"/receipts"} />
      <Box height="100%" overflow="auto">
        {error && (
          <Error title={"We are so sorry,"}>
            <SubTitle>
              but we are experiencing problems with getting your reciept. Please
              try again later.
            </SubTitle>
          </Error>
        )}

        <ReceiptLayout>
          <Receipt mb="15px" receipt={receipt}></Receipt>
          <ReceiptDescription>{receipt.Description}</ReceiptDescription>
          <Box>
            {ingredients.map(ingredient => (
              <React.Fragment>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center" minHeight="30px">
                    {ingredient.RecentlyBought && <RefrigeratorStyled />}
                    <Ingredient display="flex" alignItems="center">
                      {ingredient.Name}
                    </Ingredient>
                  </Box>
                  <Amount>{ingredient.Amount}</Amount>
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </ReceiptLayout>
      </Box>
    </Box>
  ) : null;
};
