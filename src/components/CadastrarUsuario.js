/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';

import Firebase from '../controller/Firebase';
import Usuario from "../model/Usuario";

export default class CadastroUsuario extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
  }
  Firebase = new Firebase();

  cadastrarUsuario() {
    const {email, password, nome} = this.state;
    if (email === '' || password === '' || nome === '') {
      ToastAndroid.show("Faltam dados obrigatórios",ToastAndroid.SHORT);
    } else {
      const usuario = new Usuario(nome,email);
      this.Firebase.autenticarUsuarioF(usuario.email,password)
        .then(() => {
          try {
            ToastAndroid.show('Cadastro efetuado com sucesso!',ToastAndroid.SHORT);
            this.props.navigation.navigate('Login');

            //Adicionar ao banco
            this.Firebase.cadastrarUsuarioF(usuario);
          } catch (error) {
            console.log(error);
            ToastAndroid.show('Não foi possivel efetuar o cadastro',ToastAndroid.SHORT);
          }
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              ToastAndroid.show('Esse email já está cadastrado',ToastAndroid.SHORT);
              break;
            case 'auth/invalid-email':
              ToastAndroid.show('Esse email é invalido',ToastAndroid.SHORT);
              break;
            case 'auth/weak-password':
              ToastAndroid.show('A senha deve ter no minimo 6 caracteres',ToastAndroid.SHORT);
              break;
            default:
              ToastAndroid.show('Erro ao realizar cadastro',ToastAndroid.SHORT);
          }
        });
    }
  }

  render() {
    const { nome, email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <Text style={styles.titulo}>Cadastro Usuario</Text>
          <View>
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Nome"
              value={nome}
              onChangeText={(nome) => { this.setState({ nome }) }}
            />
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Email"
              onChangeText={(email) => { this.setState({ email }) }}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Senha"
              secureTextEntry
              onChangeText={(password) => { this.setState({ password }) }}
              value={password}
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
    backgroundColor: '#009688',
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
