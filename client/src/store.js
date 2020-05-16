import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loadState, saveState } from "./utils/stateLoader";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];
let store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
  loadState()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
