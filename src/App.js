import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReceiptsPage from "./pages/ReceiptsPage";
import CameraPage from "./pages/CameraPage";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import styled from "styled-components";
import { Provider } from "react-redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
// import './services/receipts.mock';
import {
  loadingReceiptsEpic,
  loadReceiptsEpic,
  loadedReceiptsEpic
} from "./store/receipts/epics";
import receipts from "./store/receipts/reducer";
import { GlobalStyle } from "./components/Global";
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware
} from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const LayoutStyled = styled("div")`
  height: 100%;
`;

const rootEpic = combineEpics(
  loadReceiptsEpic,
  loadingReceiptsEpic,
  loadedReceiptsEpic
);
const epicMiddleware = createEpicMiddleware();
const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    receipts
  });
const store = createStore(
  createRootReducer(history),
  composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(history)))
);
epicMiddleware.run(rootEpic);

export const App = () => (
  <LayoutStyled>
    <GlobalStyle />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
          <Route exact path={"/camera"} component={CameraPage} />
          <Route exact path={"/receipts"} component={ReceiptsPage} />
          // TODO made default route
        </Switch>
      </ConnectedRouter>
    </Provider>
  </LayoutStyled>
);

export default App;
