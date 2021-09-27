import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import default_ from './src/global/themes/default';
import Routes from './src/routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={default_}>
      <StatusBar backgroundColor={'#1B75BB'} />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
