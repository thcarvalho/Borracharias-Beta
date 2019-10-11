/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
      alert("Cheque seu email")
      this.props.navigation.navigate("Login");
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          alert("O email informado é invalido");
          break;
        case 'auth/user-not-found':
          alert("Email não cadastrado");
          break;
        default:
          alert("Não foi possivel enviar o email")
          console.log(error.code);
          break;
      }
    })
};

  render() {
    const {email} = this.state;
    return (
      <View style={styles.container}>
                
       <Text style={{fontSize: 18, marginBottom: 20, color: '#00695c'}}>Informe seu e-mail para redefinir a senha</Text>         
        <TextInput 
          style={styles.caixasTexto} 
          underlineColorAndroid='transparent' 
          placeholder='Email'
          value={email}
          onChangeText={(email) => {this.setState({email})}}
        />
        
         <View>
            <TouchableOpacity onPress={() => {this.redefinirSenha(email)}} style={styles.botao}>
		           <Text>ENVIAR</Text>
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
  caixasTexto: {
    width: 300,
    borderRadius: 20,
    padding: 14,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  botao: {
    alignItems: 'center',
    width: 300,
    borderRadius: 20,
    backgroundColor: '#00695c',
    color: '#dcdcdc',
    padding: 12,
    marginTop: 8,
    marginBottom: 30,
    fontSize:16,
  },
});
