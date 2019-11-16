import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReceiptsPage from "./pages/Receipts";
import CameraPage from "./pages/CameraPage";
import { combineReducers, createStore, applyMiddleware } from "redux";
import styled from "styled-components";
import { Provider } from "react-redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { loadReceiptsEpic } from "./store/receipts/epics";
import receipts from "./store/receipts/reducer";
import { GlobalStyle } from "./components/Global";

const LayoutStyled = styled("div")`
  height: 100%;
`;

const rootEpic = combineEpics(loadReceiptsEpic);
const epicMiddleware = createEpicMiddleware();
const rootReducer = combineReducers({
  receipts
});

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);
export const App = () => (
  <LayoutStyled>
    <GlobalStyle />
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route exact path={"/camera"} component={CameraPage} />
          <Route exact path={"/receipts"} component={ReceiptsPage} />
          // TODO made default route
        </Switch>
      </BrowserRouter>
    </Provider>
  </LayoutStyled>
);

export default App;
