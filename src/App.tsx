import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import store from './store';
import Routes from './routes';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';
import { lightTheme } from './styles/lightTheme';
import 'react-toastify/dist/ReactToastify.css';

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
