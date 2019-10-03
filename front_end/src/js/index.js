import React from "react";
import { AppContainer } from "react-hot-loader";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import Routes from "./router.js";
import reducers from "./reducers";

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Routes />
    </Provider>
  </AppContainer>,
  document.getElementById("root")
);
