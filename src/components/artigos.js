import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Artigos extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content'/>
        <TouchableOpacity style={{padding: 20, paddingTop: 30}} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={20} color={'#ddd'}/>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Artigos</Text>
      </View>
    );
  }
}
