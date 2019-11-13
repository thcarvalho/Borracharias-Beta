/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Hoshi } from 'react-native-textinput-effects';

import Firebase from "../controller/Firebase";

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    autenticado: null,
    isLoading: false,
    passwordShow: false,
  }
  Firebase = new Firebase();

  async componentWillMount() {
    if (this.Firebase.verificarAutenticacao(this)) {
      this.setState({ autenticado: true });
    }
  }

  logarUsuario = (email, password) => {
    this.setState({ isLoading: true });
    if (email === '' || password === '') {
      ToastAndroid.show('Por favor, preencha os campos', ToastAndroid.SHORT);
      this.setState({ isLoading: false })
    } else {
      this.Firebase.logarUsuarioF(email, password)
        .then(() => { this.props.navigation.navigate('Principal') })
        .catch(error => {
          switch (error.code) {
            case 'auth/wrong-password':
              ToastAndroid.show('Senha incorreta', ToastAndroid.SHORT);
              break;
            case 'auth/invalid-email':
              ToastAndroid.show('Esse email é invalido', ToastAndroid.SHORT);
              break;
            case 'auth/user-not-found':
              ToastAndroid.show('Usuario não encontrado', ToastAndroid.SHORT);
              break;
            default:
              ToastAndroid.show('Erro ao realizar login', ToastAndroid.SHORT);
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
    const { email, password, passwordShow } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#00695c'
          barStyle='lightContent'
        />
        <View style={styles.tela}>
          <Text style={styles.textoLogin}>Login</Text>

          <View>            
            <Hoshi
             label={'Email'}
             borderColor={'#00695c'}
             borderHeight={3}
             inputPadding={16}
             onChangeText={email => { this.setState({ email }) }}
             autoCapitalize={'none'}
             style={styles.caixaTexto}
             />
          </View>
          <View>
            <View style={{ flexDirection: 'row', marginTop: 4}}>
            <Hoshi
             label={'Senha'}
             borderColor={'#00695c'}
             borderHeight={3}
             inputPadding={16}
             onChangeText={password => { this.setState({ password }) }}
             autoCapitalize={'none'}
             style={styles.caixaTextoSenha}
            secureTextEntry={passwordShow ? false : true}
              />
              <TouchableOpacity onPress={this.tooglePassword} activeOpacity={0.8}>
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

          <TouchableOpacity onPress={() => { this.logarUsuario(email, password); }} activeOpacity={0.8} disabled={this.state.isLoading} style={styles.botao}>
            {
              this.state.isLoading ?
                (
                  <ActivityIndicator animating size="small" color={'#fff'} />
                ) : (
                  <Text style={{ color: '#dcdcdc' }}>ENTRAR</Text>
                )
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.props.navigation.navigate('EsqueceuSenha'); }}>
            <Text style={styles.links}>Esqueceu a senha?</Text>
          </TouchableOpacity>

            <View style={{flexDirection: 'row'}}>
              <Text style={{paddingVertical: 7,fontSize: 16, color:'#009688' }}>Não possui conta?</Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Cadastro'); }}>
            <Text style={styles.links}>Cadastre-se!</Text>
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
    justifyContent: 'space-between',
  },
  tela: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconeEye: {
    paddingHorizontal: 8,
    paddingTop: 6,
    marginTop: 10,
  },
  textoLogin: {
    marginTop: 120,
    marginBottom: 30,
    color: '#00695c',
    fontSize: 38,
    fontFamily: 'Arial',
    fontWeight: 'bold',
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
  links: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    fontSize: 16,
    color: '#00695c',
  },
});

