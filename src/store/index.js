import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools } from "remote-redux-devtools";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import reducers from "../reducer";

const persistConfig = {
  key: "ems",
  whitelist: ["user"],
  storage: storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  [],
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export const persistor = persistStore(store);

export default store;
