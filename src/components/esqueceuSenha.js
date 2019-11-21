/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

import Firebase from "../controller/Firebase";

export default class EsqueceuSenha extends React.Component {
  state = {
    email: '',
    erro: false,
    borda: '#00695c',
    mensagem: '',
    isLoading: false,
  }
  Firebase = new Firebase()

  redefinirSenha(email) {
    this.setState({ isLoading: true });
    if (email === '') {
      this.setState({ isLoading: false, erro: true, borda: "#870303", mensagem: 'Por favor informe um email' })
      // ToastAndroid.show('Por favor informe um email', ToastAndroid.SHORT);
    } else {
      this.Firebase.enviarRedefinicaoSenha(email)
        .then(() => {
          alert("Cheque seu email")
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              // ToastAndroid.show("O email informado é invalido", ToastAndroid.SHORT);
              this.setState({ erro: true, borda: "#870303", mensagem: 'O email informado é invalido' })
              break;
            case 'auth/user-not-found':
                this.setState({ erro: true, borda: "#870303", mensagem: 'Email não cadastrado' })
                // ToastAndroid.show("Email não cadastrado", ToastAndroid.SHORT);
              break;
            default:
              ToastAndroid.show("Não foi possivel enviar o email", ToastAndroid.SHORT);
              console.log(error.code);
              break;
          }
        })
        .finally(() => this.setState({ isLoading: false }))
    }
  };

  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Informe seu e-mail para redefinir a senha</Text>
        <View>
          <Hoshi
            label={'Email'}
            borderColor={this.state.borda}
            borderHeight={3}
            inputPadding={16}
            onChangeText={email => { this.setState({ email, erro: false, borda: '#00695c' }) }}
            autoCapitalize={'none'}
            labelStyle={{ color: this.state.borda }}
            value={email}
            style={styles.caixaTexto}
          />
          {
            this.state.erro && (
              <Text style={{ color: '#870303', fontSize: 12 }}>{this.state.mensagem}</Text>
            )
          }
        </View>
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
  texto: {
    fontSize: 18,
    marginBottom: 20,
    color: '#00695c',
  },
  icone: {
    marginTop: 8
  },
  caixaTexto: {
    width: 310,
    fontSize: 18,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 300,
    borderRadius: 200,
    backgroundColor: '#00695c',
    padding: 12,
    marginTop: 16,
    marginBottom: 26,
    fontSize: 16,
  },
});
