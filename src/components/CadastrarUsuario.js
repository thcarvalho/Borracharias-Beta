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

// import Ionicons from 'react-native-vector-icons/Ionicons';

import Firebase from '../Firebase';

export default class CadastroUsuario extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
  }
  Firebase = new Firebase();

  cadastrarUsuario(email, password, nome) {
    if (email === '' || password === '' || nome === '') {
      alert("Faltam dados obrigatórios");
    } else {
      this.Firebase.autenticarUsuarioF(email, password)
        .then(() => {
          try {
            alert('Cadastro efetuado com sucesso!');
            this.props.navigation.navigate('Login');

            //Adicionar ao banco
            this.Firebase.cadastrarUsuarioF(nome, email)
          } catch (error) {
            console.log(error);
          }
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert('Esse email já está cadastrado');
              break;
            case 'auth/invalid-email':
              alert('Esse email é invalido');
              break;
            case 'auth/weak-password':
              alert('A senha deve ter no minimo 6 caracteres');
              break;
            default:
              alert('Erro ao realizar cadastro');
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
              <TouchableOpacity onPress={() => { this.cadastrarUsuario(email, password, nome) }} style={styles.botao}>
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
