import React from 'react';

import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import GlobalStyle from './styles/global';
import Routes from './routes';

import { lightTheme } from './styles/lightTheme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <GlobalStyle />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
