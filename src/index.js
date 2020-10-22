import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import firebaseConfig from './store/base';
import './App.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HelmetProvider } from 'react-helmet-async';
import LoadingOverlay from './components/LoadingOverlay';

ReactDOM.render(
  <HelmetProvider>
    <Suspense fallback={ <LoadingOverlay /> }>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} name="LoginExample">
        <App />
      </FirebaseAppProvider>
    </Suspense>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
