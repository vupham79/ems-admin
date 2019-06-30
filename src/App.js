import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";

import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './store';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default () => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={() => {
                  return (
                    <route.layout>
                      <route.component />
                    </route.layout>
                  )
                }}
              />
            );
          })}
        </div>
      </Router>
    </PersistGate>
  </ReduxProvider>
);
