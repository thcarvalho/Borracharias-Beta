/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Firebase from '../controller/Firebase';
import Usuario from "../model/Usuario";

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
    this.setState({ passwordShow : !passwordShow});
}

  render() {
    const { nome, email, password, passwordShow } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tela}>
        <View>
        <Text style={{marginTop:10, marginLeft: 25, color: '#00695c', size: 18}}>Nome</Text>
        <View style={{flexDirection: 'row',}}>
        	 <Icon style={styles.icone} name={'user'} size={24} color={'#00695c'}/>
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="#00695c"
              value={nome}
              onChangeText={(nome) => { this.setState({ nome }) }}
            />
            </View>
          </View>
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
	          style={styles.caixasTexto}
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
  icone: {
    marginTop: 8
  },
  iconeEye:{
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 5,
},
  caixasTexto: {
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
    fontSize:16,
  },
});
