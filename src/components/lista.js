import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default class Lista extends Component {
 render() {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity style={{padding: 20}} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'}/>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Lista</Text>

      </View>
    );
  }
}
