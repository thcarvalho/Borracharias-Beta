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

import {autenticarUsuario} from '../Firebase';

export default class CadastroUsuario extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
  }

  nomeChange = (nome) => {
    this.setState({ nome });
  }
  emailChange = (email) => {
    this.setState({ email });
  }
  passwordChange = (password) => {
    this.setState({ password });
  }
 
  render() {
    const {nome, email, password} = this.state;
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
              onChangeText={this.nomeChange}
            />
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Email"
              onChangeText={this.emailChange}
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Senha"
              secureTextEntry
              onChangeText={this.passwordChange}
              value={password}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <View style={styles.centralizar}>
              <TouchableOpacity onPress={() => {autenticarUsuario(email, password, nome, this)}} style={styles.botao}>
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
