import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "react-native-firebase";

export default class Settings extends Component {
  logout(){
    firebase.auth().signOut();
    this.props.navigation.navigate('Login');
  }
  render() {
    return(
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{padding: 20}} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'}/>
        </TouchableOpacity>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.botoes}>
              <Text>Editar Perfil</Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.botoes} >
              <Text>Resetar Senha</Text>
            </TouchableOpacity>    

            <TouchableOpacity onPress={() => {this.logout()}}>
              <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Sair</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  botoes: {
      textAlign: 'center',
      paddingVertical:  20
    },
});