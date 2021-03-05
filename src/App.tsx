import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from 'react-simple-hook-modal';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-simple-hook-modal/dist/styles.css';
import store from './store';
import GlobalStyle from './styles/global';
import Routes from './routes';

import { lightTheme } from './styles/lightTheme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <ToastContainer />
          <GlobalStyle />
          <ModalProvider>
            <Routes />
          </ModalProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
