<<<<<<< HEAD
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
=======
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View,Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome5';

import Firebase from "../Firebase";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Logout extends Component {
    Firebase = new Firebase()
  render() {
    return (
        <SafeAreaView style={{flex: 1}} forceInset={{ botttom: "always", horizontal: "never" }}>
        <View style={styles.container}>
        <TouchableOpacity style={styles.botao} onPress={() => {this.Firebase.logout()}}>
        <Icon name="sign-out-alt" size={20} color={'#00695c'} />
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
        paddingTop: 14,
        borderTopWidth: 1,
        //backgroundColor: '#dcdcdc',
        borderColor: '#dcdcdc',
    },
    botao: {
      flexDirection: 'row',
      marginBottom: -2,
    },
    texto: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 6,
        color: '#00695c',
    },
});
>>>>>>> 5407e41305c7ed01ce80f5aa1fa7f6b7cc16710a
