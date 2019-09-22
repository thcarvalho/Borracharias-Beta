import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert 
} from 'react-native';

export default class EsqueceuSenha extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Esqueceu a senha?</Text>
        
        <Text style={styles.texto}>Informe seu e-mail para que possa redefinir a senha</Text>
        
        <TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Email'/>
        
         <View>
            <TouchableOpacity onPress={() => {alert('Email enviado');}} style={styles.botao}>
		           <Text>Enviar</Text>
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
      marginTop: 30,
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
