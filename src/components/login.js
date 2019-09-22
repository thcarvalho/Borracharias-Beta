/* eslint-disable prettier/prettier */
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

import { verificarAutenticacao,logarUsuario } from "../Firebase";

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    autenticado: null,
  }
  async componentWillMount(){
    if (verificarAutenticacao(this)) {
      this.setState({autenticado: true});
    }
  }
  emailChange = (email) => {
    this.setState({email});
  };
  passwordChange = (password) => {
    this.setState({password});
  };
  
  esqueceuSenha() {
    this.props.navigation.navigate('Esquceu a Sennha');
    //Alert.alert('Informar email para enviar nova senha');
  }

  render() {
    const { email, password} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <Text style={styles.textoLogin}>Login</Text>

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
            secureTextEntry={true}
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Senha"
            onChangeText={this.passwordChange}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity onPress={() => { logarUsuario(email,password,this); }} style={styles.botao}>
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
