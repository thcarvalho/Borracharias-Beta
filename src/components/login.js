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
    this.setState({ passwordShow : !passwordShow});
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
        <Text style={{marginTop:10, marginLeft: 25, color: '#00695c', size: 18}}>Email</Text>
        <View style={{flexDirection: 'row',}}>
        	 <Icon style={styles.icone} name={'envelope'} size={24} color={'#00695c'}/>
          <TextInput
            onChangeText={email => { this.setState({ email }) }}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            underlineColorAndroid={'#00695c'}
	          style={styles.caixaTexto}
          />     
    </View>
      </View>
        <View>
        <Text style={{marginTop:10, marginLeft: 25, color: '#00695c', size: 18}}>Senha</Text>
    <View style={{flexDirection: 'row',}}>
	      <Icon style={styles.icone} name={'lock'} size={24} color={'#00695c'}/>
        <TextInput
            style={styles.caixaTextoSenha}
            underlineColorAndroid={'#00695c'}
            onChangeText={password => { this.setState({ password }) }}
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordShow ? false : true}
            />
            <TouchableOpacity onPress={this.tooglePassword} activeOpacity={0.8}>
                {
                    this.state.passwordShow ?
                  (
                      <Icon name={'eye-slash'} size={23} color={'#00695c'} style={styles.iconeEye} />
                  ) : (
                      <Icon name={'eye'} size={23} color={'#00695c'} style={styles.iconeEye}/>
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
    backgroundColor: '#dcdcdc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tela: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icone: {
    marginTop: 8
  },
  iconeEye:{
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 5,
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
    width: 280,
    fontSize: 18,
    marginBottom: 10,
  },
  caixaTextoSenha: {
    width: 245,
    fontSize: 18,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 300,
    borderRadius: 16,
    backgroundColor: '#00695c',
    padding: 12,
    marginTop: 16,
    marginBottom: 26,
    fontSize:16,
  },
  links: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 16,
    color: '#00695c',
  },
});

