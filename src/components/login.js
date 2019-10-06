/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Firebase from "../Firebase";

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    autenticado: null,
  }
  Firebase = new Firebase();

  async componentWillMount() {
    if (this.Firebase.verificarAutenticacao(this)) {
      this.setState({ autenticado: true });
    }
  }

  logarUsuario = (email, password) => {
    if (email == '' || password == '') {
      alert('Por favor, preencha os campos');
    } else {
      this.Firebase.logarUsuarioF(email, password)
        .then(() => { this.props.navigation.navigate('Principal') })
        .catch(error => {
          switch (error.code) {
            case 'auth/wrong-password':
              alert('Senha incorreta');
              break;
            case 'auth/invalid-email':
              alert('Esse email é invalido');
              break;
            case 'auth/user-not-found':
              alert('Usuario não encontrado');
              break;
            default:
              alert('Erro ao realizar login');
          }
        });
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <Text style={styles.textoLogin}>Login</Text>

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Email"
            onChangeText={email => { this.setState({ email }) }}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            secureTextEntry={true}
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Senha"
            onChangeText={password => { this.setState({ password }) }}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity onPress={() => { this.logarUsuario(email, password); }} style={styles.botao}>
            <Text>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.navigation.navigate('EsqueceuSenha'); }}>
            <Text style={styles.links}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Cadastro'); }}>
            <Text style={styles.links}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009688',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tela: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoLogin: {
    marginTop: 120,
    marginBottom: 30,
    color: '#fff',
    fontSize: 38,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  caixasTexto: {
    width: 250,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 80,
    borderRadius: 8,
    backgroundColor: '#E0FFFF',
    padding: 10,
    marginTop: 25,
    marginBottom: 25,
  },
  links: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
    color: '#E0FFFF',
  },
});

//*AppRegistry.registerComponent('TelaPrincipal', () => TelaPrincipal);*//
