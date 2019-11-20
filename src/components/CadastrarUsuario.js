/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Firebase from '../controller/Firebase';
import Usuario from "../model/Usuario";
import { Hoshi } from 'react-native-textinput-effects';

export default class CadastroUsuario extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
    isLoading: false,
    passwordShow: false,
  }
  Firebase = new Firebase();

  cadastrarUsuario() {
    this.setState({ isLoading: true });
    const { email, password, nome } = this.state;
    if (email === '' || password === '' || nome === '') {
      ToastAndroid.show("Faltam dados obrigatórios", ToastAndroid.SHORT);
      this.setState({ isLoading: false })
    } else {
      const usuario = new Usuario(nome, email);
      this.Firebase.autenticarUsuarioF(usuario.email, password)
        .then(() => {
          try {
            ToastAndroid.show('Cadastro efetuado com sucesso!', ToastAndroid.SHORT);
            this.props.navigation.navigate('Login');

            //Adicionar ao banco
            this.Firebase.cadastrarUsuarioF(usuario);
          } catch (error) {
            console.log(error);
            ToastAndroid.show('Não foi possivel efetuar o cadastro', ToastAndroid.SHORT);
          }
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              ToastAndroid.show('Esse email já está cadastrado', ToastAndroid.SHORT);
              break;
            case 'auth/invalid-email':
              ToastAndroid.show('Esse email é invalido', ToastAndroid.SHORT);
              break;
            case 'auth/weak-password':
              ToastAndroid.show('A senha deve ter no minimo 6 caracteres', ToastAndroid.SHORT);
              break;
            default:
              ToastAndroid.show('Erro ao realizar cadastro', ToastAndroid.SHORT);
          }
        })
        .finally(() => this.setState({ isLoading: false }))
    }
  }

  tooglePassword = () => {
    const { passwordShow } = this.state;
    this.setState({ passwordShow: !passwordShow });
  }

  render() {
    const { nome, email, password, passwordShow } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
          <View>
            <Hoshi
              style={styles.caixaTexto}
              label={'Nome'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              value={nome}
              autoCapitalize={'none'}
              labelStyle={{color: '#00695c'}}
              onChangeText={(nome) => { this.setState({ nome }) }}
            />
          </View>
          <View>
            <Hoshi
              label={'Email'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              onChangeText={email => { this.setState({ email }) }}
              autoCapitalize={'none'}
              keyboardType={"email-address"}
              labelStyle={{color: '#00695c'}}
              style={styles.caixaTexto}
            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <Hoshi
                label={'Senha'}
                borderColor={'#00695c'}
                borderHeight={3}
                inputPadding={16}
                onChangeText={password => { this.setState({ password }) }}
                autoCapitalize={'none'}
                style={styles.caixaTexto}
                labelStyle={{color: '#00695c'}}
                secureTextEntry={passwordShow ? false : true}
              />
              <TouchableOpacity style={styles.alinharIcone} onPress={this.tooglePassword} activeOpacity={0.8}>
                {
                  this.state.passwordShow ?
                    (
                      <Icon name={'eye'} size={23} color={'#00695c'} style={styles.iconeEye} />
                    ) : (
                      <Icon name={'eye-slash'} size={23} color={'#00695c'} style={styles.iconeEye} />
                    )
                }
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centralizar}>
            <TouchableOpacity onPress={() => { this.cadastrarUsuario(); }} activeOpacity={0.8} disabled={this.state.isLoading} style={styles.botao}>
              {
                this.state.isLoading ?
                  (
                    <ActivityIndicator animating size="small" color={'#fff'} />
                  ) : (
                    <Text style={{ color: '#dcdcdc' }}>CONCLUIR</Text>
                  )
              }
            </TouchableOpacity>
          </View>
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
  tela: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centralizar: {
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  alinharIcone: {
    position: "absolute",
    right: 0,
    bottom: 25
  },
  iconeEye: {
    paddingHorizontal: 8,
    paddingTop: 6,
    marginTop: 10,
  },
  caixaTexto: {
    width: 310,
    fontSize: 18,
    marginBottom: 10,
  },
  caixaTextoSenha: {
    width: 264,
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
