import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import GlobalStyle from './styles/global';

import 'react-toastify/dist/ReactToastify.css';

import history from './services/history';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </Provider>
    </>
  );
}

export default App;
