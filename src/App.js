import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { routes, NotFoundPage } from "./routes";

import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from './store';

//Firebase
import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from './utils/constants';

// import Toast from './components/Toast';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseStorage = firebaseApp.storage();
// firebaseApp.storage().ref('companies/fsoft.png').getDownloadURL().then(value => console.log(value));
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};
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
                        <route.layout signOut={this.props.signOut}>
                          <route.component storage={firebaseStorage} />
                        </route.layout>)
                    }
                    return (
                      <route.component signInWithGoogle={this.props.signInWithGoogle} user={this.props.user} />
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

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);