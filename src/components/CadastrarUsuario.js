/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "react-native-firebase";

let auth = firebase.auth();

export default class CadastroUsuario extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
  }

  ref = firebase.firestore().collection('usuarios');

  nomeChange = (nome) => {
    this.setState({ nome });
  }
  emailChange = (email) => {
    this.setState({ email });
  }
  passwordChange = (password) => {
    this.setState({ password });
  }
  sucessoCadastro() {
    alert('Cadastro efetuado com sucesso!');
    this.props.navigation.navigate('Login');
  }

  cadastrarUsuario() {
    let email = this.state.email;
    let password = this.state.password;
    let nome = this.state.nome;
    if (email === '' || password === '' || nome === '') {
      alert('Por favor, preencha os campos');
    } else {
      //Criar Autenticação por Email
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => { this.sucessoCadastro() })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              Alert('Esse email já está cadastrado');
              break;
            case 'auth/invalid-email':
              Alert('Esse email é invalido');
              break;
            case 'auth/weak-password':
              Alert('A senha deve ter no minimo 6 caracteres');
              break;
            default:
              Alert('Erro ao realizar cadastro');
          }
        });
      //Adicionar ao Banco
      this.ref.add({
        nome: this.state.nome,
        email: this.state.email,
        userType: 'Comum',
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <Text style={styles.titulo}>Cadastro Usuario</Text>

          <View>
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Nome"
              value={this.state.nome}
              onChangeText={this.nomeChange}
            />
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
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Senha"
              secureTextEntry
              onChangeText={this.passwordChange}
              value={this.state.senha}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.centralizar}>
              <TouchableOpacity onPress={() => { this.cadastrarUsuario() }} style={styles.botao}>
                <Text>Concluir</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  centralizar: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    marginTop: 70,
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
    padding: 12,
    marginTop: 25,
    marginBottom: 25,
  },
});
