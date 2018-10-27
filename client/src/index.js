import React from "react";
import ReactDOM from "react-dom";
import "./index.styl";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store/store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
