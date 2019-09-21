import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from "react-native-firebase";

let autenticacao = firebase.auth();

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    autenticado: null,
  }

  logarUsuario() {
    let email = this.state.email;
    let password = this.state.password;
    autenticacao
      .signInWithEmailAndPassword(email, password)
      .then(() => { this.sucessoLogin() })
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
  
  verificarUsuario(){
    autenticacao.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          autenticado: true,
        })
      }
      return null;
      }
    );
  }

  emailChange = (email) => {
    this.setState({email});
  };
  passwordChange = (password) => {
    this.setState({password});
  };
  
  sucessoLogin() {
    this.props.navigation.navigate('Principal');
  }
  esqueceuSenha() {
    this.props.navigation.navigate('Esquceu a Sennha');
    //Alert.alert('Informar email para enviar nova senha');
  }
  cadastro() {
    this.props.navigation.navigate('Cadastro');
  }

  render() {
    if (this.state.autenticado === true) {
      this.props.navigation.navigate('Principal');
    }
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <Text style={styles.textoLogin}>Login</Text>

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Email"
            onChangeText={this.emailChange}
            value={this.state.email}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            secureTextEntry={true}
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Senha"
            onChangeText={this.passwordChange}
            value={this.state.senha}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity onPress={() => { this.logarUsuario() }} style={styles.botao}>
            <Text>ENTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.esqueceuSenha() }}>
            <Text style={styles.links}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.cadastro() }}>
            <Text style={styles.links}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3CB371',
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
