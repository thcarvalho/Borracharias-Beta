/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, ScrollView,Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { DrawerItems, SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';

import Firebase from "../controller/Firebase";
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

export default class Logout extends Component {
    Firebase = new Firebase()
  render() {
    return (
        <SafeAreaView style={{flex: 1}} forceInset={{ top: "always", horizontal: "never" }}>
        <ScrollView style={{flex: 1}}>
          <DrawerItems {...this.props} />
        </ScrollView>
        <View style={styles.container}>
        <TouchableOpacity style={styles.botao} onPress={() => {this.Firebase.logout()}}>
        <Icon name="sign-out-alt" size={20} color={'#000'} />
            <Text style={styles.texto}>Logout</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        paddingBottom: 20,
    },
    botao: {
      flexDirection: 'row',
    },
    texto: {
        fontSize: 16,
        paddingLeft: 10,
    },
});
