/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

import Firebase from "../controller/Firebase";

export default class EsqueceuSenha extends React.Component {
state = {
  email: '',
}
Firebase = new Firebase()

redefinirSenha(email){
  this.Firebase.enviarRedefinicaoSenha(email)
    .then(() => {
      ToastAndroid.show("Cheque seu email",ToastAndroid.SHORT)
      this.props.navigation.navigate("Login");
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          ToastAndroid.show("O email informado é invalido",ToastAndroid.SHORT);
          break;
        case 'auth/user-not-found':
          ToastAndroid.show("Email não cadastrado",ToastAndroid.SHORT);
          break;
        default:
          ToastAndroid.show("Não foi possivel enviar o email",ToastAndroid.SHORT)
          console.log(error.code);
          break;
      }
    })
};

  render() {
    const {email} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Esqueceu a senha?</Text>
        
        <Text style={styles.texto}>Informe seu e-mail para que possa redefinir a senha</Text>
        
        <TextInput 
          style={styles.caixasTexto} 
          underlineColorAndroid='transparent' 
          placeholder='Email'
          value={email}
          onChangeText={(email) => {this.setState({email})}}
        />
        
         <View>
            <TouchableOpacity onPress={() => {this.redefinirSenha(email)}} style={styles.botao}>
		           <Text>Enviar</Text>
	         </TouchableOpacity>
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
        },
  titulo: {
      marginTop: 150,
      marginBottom: 30,
      color: '#fff',
      fontSize: 38,
      fontFamily: 'Arial',
      fontWeight: 'bold',
  },
  texto: {
    fontSize: 18,
    paddingHorizontal: 11,
  },
  caixasTexto: {
      width: 338,
      borderRadius: 10,
      backgroundColor: '#fff',
      padding: 14,
      marginBottom: 10,
      marginTop: 30
  },
    botao: {
        alignItems: 'center',
        width: 80,
        borderRadius: 8,
        backgroundColor: '#E0FFFF',
        padding: 15,
        marginTop: 25,
    },
    
});
