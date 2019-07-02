import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes, NotFoundPage } from "./routes";

import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './store';

import Toast from './components/Toast';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          {/* <Toast /> */}
          <Router>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={() => {
                    if (route.layout) {
                      return (
                        <route.layout>
                          <route.component />
                        </route.layout>)
                    }
                    return (
                      <route.component />
                    )
                  }
                  }
                />
              ))}
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </PersistGate>
      </ReduxProvider>
    )
  }
}

export default App