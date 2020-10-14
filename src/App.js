import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyle from './styles/global';

import './config/ReactotronConfig';

import 'react-toastify/dist/ReactToastify.css';

import history from './services/history';
import Routes from './routes';

import { store, persistor } from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
            <CssBaseline />
            <ToastContainer autoClose={3000} />
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
