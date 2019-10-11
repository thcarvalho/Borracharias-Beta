import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Artigos extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{backgroundColor:'#009688', flexDirection: 'row', elevation: 3}}>
          <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, textAlignVertical: 'center', color: '#fff', fontSize: 20}}>Artigos</Text>
        </View>
      </View>
    );
  }
}
