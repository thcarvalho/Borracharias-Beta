/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
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
    erro: false,
    erroSenha: false,
    borda: '#00695c',
    bordaSenha: '#00695c',
    mensagem: '',
    mensagemSenha: '',
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
      if (email === '') {
        this.setState({ isLoading: false, erro: true, borda: "#870303", mensagem: 'Campo Obrigatório' })
      }
      if (password === '') {
        this.setState({ isLoading: false, erroSenha: true, bordaSenha: "#870303", mensagemSenha: 'Campo Obrigatório' })
      }
      // ToastAndroid.show('Por favor, preencha os campos', ToastAndroid.SHORT);
    } else {
      this.Firebase.logarUsuarioF(email, password)
        .then(() => { this.props.navigation.navigate('Principal') })
        .catch(error => {
          switch (error.code) {
            case 'auth/wrong-password':
              // ToastAndroid.show('Senha incorreta', ToastAndroid.SHORT);
              this.setState({ erroSenha: true, bordaSenha: "#870303", mensagemSenha: 'Senha incorreta' })
              break;
            case 'auth/invalid-email':
              // ToastAndroid.show('Esse email é invalido', ToastAndroid.SHORT);
              this.setState({ erro: true, borda: "#870303", mensagem: 'Esse email é invalido' })
              break;
            case 'auth/user-not-found':
              // ToastAndroid.show('Usuario não encontrado', ToastAndroid.SHORT);
              this.setState({ erro: true, borda: "#870303", mensagem: 'Usuario não encontrado' })
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
              borderColor={this.state.borda}
              borderHeight={3}
              inputPadding={16}
              onChangeText={email => this.setState({ email, erro: false, borda: '#00695c' })}
              // onBlur={() => { this.state.vazio ? this.setState({ borda: "#870303" }) : this.setState({ borda: '#00695c' }) }}
              autoCapitalize={'none'}
              keyboardType={"email-address"}
              labelStyle={{ color: this.state.borda }}
              style={styles.caixaTexto}
            />
            {
              this.state.erro && (
                <Text style={{ color: '#870303', fontSize: 12 }}>{this.state.mensagem}</Text>
              )
            }
          </View>
          <View>
            <View style={{ marginTop: 4 }}>
              <Hoshi
                label={'Senha'}
                borderColor={this.state.bordaSenha}
                borderHeight={3}
                inputPadding={16}
                onChangeText={password => { this.setState({ password, erroSenha: false, bordaSenha: '#00695c' }) }}
                autoCapitalize={'none'}
                labelStyle={{ color: this.state.bordaSenha }}
                style={styles.caixaTexto}
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
            {
              this.state.erroSenha && (
                <Text style={{ color: '#870303', fontSize: 12 }}>{this.state.mensagemSenha}</Text>
              )
            }
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

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.texto}>Não possui conta?</Text>
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
  alinharIcone: {
    position: "absolute",
    right: 0,
    bottom: 25,
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
    borderColor: '#00695c'
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
  texto: {
    paddingVertical: 7,
    fontSize: 16,
    color: '#009688',
  },
  links: {
    paddingHorizontal: 5,
    paddingVertical: 7,
    fontSize: 16,
    color: '#00695c',
  },
});

