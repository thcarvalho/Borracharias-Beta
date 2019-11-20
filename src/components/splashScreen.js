/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ActivityIndicator, Image, StatusBar } from 'react-native';

class SplashScreen extends React.Component {
  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    );
  }

  async componentDidMount() {
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <ActivityIndicator style={styles.carregamento} size="large" color={'#dcdcdc'} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00695c'
  },
  texto: {
    color: '#dcdcdc',
    fontSize: 40,
    fontWeight: 'bold'
  },
  logo: {
    width: 300,
    height: 200,
  },
  carregamento: {
    marginTop: 40,
  }
}

export default SplashScreen;