/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Firebase from "../controller/Firebase";

export default class EsqueceuSenha extends React.Component {
  state = {
    email: '',
    isLoading: false,
  }
  Firebase = new Firebase()

  redefinirSenha(email) {
    this.setState({isLoading: true});
    if (email === '') {
    this.setState({isLoading: false});
    ToastAndroid.show('Por favor informe um email', ToastAndroid.SHORT);
    } else {

    }
    this.Firebase.enviarRedefinicaoSenha(email)
      .then(() => {
        alert("Cheque seu email")
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            ToastAndroid.show("O email informado é invalido", ToastAndroid.SHORT);
            break;
          case 'auth/user-not-found':
            ToastAndroid.show("Email não cadastrado", ToastAndroid.SHORT);
            break;
          default:
            ToastAndroid.show("Não foi possivel enviar o email", ToastAndroid.SHORT);
            console.log(error.code);
            break;
        }
      })
      .finally(() => this.setState({ isLoading: false }))
  };

  render() {
    const { email } = this.state;
    return (
      <View style={styles.container}>

<Text style={{fontSize: 18, marginBottom: 20, color: '#00695c'}}>Informe seu e-mail para redefinir a senha</Text>         
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
        <View>
          <TouchableOpacity onPress={() => { this.redefinirSenha(email) }} activeOpacity={0.8} disabled={this.state.isLoading} style={styles.botao}>
          {
              this.state.isLoading ?
                (
                  <ActivityIndicator animating size="small" color={'#fff'} />
                ) : (
                  <Text style={{ color: '#dcdcdc' }}>ENVIAR</Text>
                )
            }
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
      justifyContent: 'center',
        },
        icone: {
          marginTop: 8
        },
        caixasTexto: {
          width: 280,
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
