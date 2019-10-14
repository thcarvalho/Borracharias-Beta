import React from 'react';
import { Root } from "native-base";
import Routes from './src/navigation/routes';

const App = () => {
  return (
    <Root>
      <Routes />
    </Root>
  );
};

export default App;
