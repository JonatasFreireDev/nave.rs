import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import GlobalStyle from './styles/global';
import Routes from './routes';

import { lightTheme } from './styles/lightTheme';

import AppProvider from './hooks';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <AppProvider>
            <ToastContainer />
            <GlobalStyle />
            <Routes />
          </AppProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
