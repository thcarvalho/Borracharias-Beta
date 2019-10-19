/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import Firebase from "../controller/Firebase";

export default class EsqueceuSenha extends React.Component {
  state = {
    email: '',
    isLoading: false,
  }
  Firebase = new Firebase()

  redefinirSenha(email) {
    this.setState({isLoading: true});
    if (email === '') {
    this.setState({isLoading: false});
    ToastAndroid.show('Por favor informe um email', ToastAndroid.SHORT);
    } else {

    }
    this.Firebase.enviarRedefinicaoSenha(email)
      .then(() => {
        alert("Cheque seu email")
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            ToastAndroid.show("O email informado é invalido", ToastAndroid.SHORT);
            break;
          case 'auth/user-not-found':
            ToastAndroid.show("Email não cadastrado", ToastAndroid.SHORT);
            break;
          default:
            ToastAndroid.show("Não foi possivel enviar o email", ToastAndroid.SHORT);
            console.log(error.code);
            break;
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  };

  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>

        <Text style={{ fontSize: 18, marginBottom: 20, color: '#00695c' }}>Informe seu e-mail para redefinir a senha</Text>
        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid='transparent'
          placeholder='Email'
          value={email}
          onChangeText={(email) => { this.setState({ email }) }}
        />
        <View>
          <TouchableOpacity onPress={() => { this.redefinirSenha(email) }} activeOpacity={0.8} disabled={this.state.isLoading} style={styles.botao}>
          {
              this.state.isLoading ?
                (
                  <ActivityIndicator animating size="small" color={'#fff'} />
                ) : (
                  <Text style={{ color: '#dcdcdc' }}>ENVIAR</Text>
                )
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dcdcdc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixasTexto: {
    width: 300,
    borderRadius: 20,
    padding: 14,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  botao: {
    alignItems: 'center',
    width: 300,
    borderRadius: 20,
    backgroundColor: '#00695c',
    color: '#dcdcdc',
    padding: 12,
    marginTop: 8,
    marginBottom: 30,
    fontSize: 16,
  },
});