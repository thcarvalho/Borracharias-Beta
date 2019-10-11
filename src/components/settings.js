/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Firebase from "../controller/Firebase";

export default class Settings extends Component {
  Firebase = new Firebase()
  render() {
    return(
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{padding: 20, paddingTop: 30}} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={20} color={'#ddd'}/>
        </TouchableOpacity>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.botoes}>
              <Text>Editar Perfil</Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.botoes} >
              <Text>Resetar Senha</Text>
            </TouchableOpacity>    

            <TouchableOpacity onPress={() => {this.Firebase.logout()}}>
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