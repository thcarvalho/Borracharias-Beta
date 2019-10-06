import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Artigos extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{padding: 20}} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={20} color={'#ddd'}/>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Artigos</Text>
      </View>
    );
  }
}
