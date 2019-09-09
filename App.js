import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Routes from './src/routes';
import Login from './src/components/login';
import Cadastro from './src/components/cadastro';

const App = () => {
  return <Routes />;
};

const styles = StyleSheet.create({});

export default App;
