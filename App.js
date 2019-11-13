import React, {useEffect} from 'react';
import { Root } from "native-base";
import Routes from './src/navigation/routes';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Root>
      <Routes />
    </Root>
  );
};

export default App;
