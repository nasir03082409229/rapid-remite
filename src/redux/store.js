import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";

import auth from "./reducers/authreducer";
import AsyncStorage from "@react-native-community/async-storage";

const persistedConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistedConfig,
  combineReducers({
    auth,
  })
);
const initialState = {};

const middleware = [thunk];
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
