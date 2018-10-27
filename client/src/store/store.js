import { applyMiddleware, createStore, compose } from "redux";
import promise from "redux-promise-middleware";
import reducer from "./reducers/reducerExecute";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer /* preloadedState, */,
  composeEnhancers(applyMiddleware(promise()))
);
