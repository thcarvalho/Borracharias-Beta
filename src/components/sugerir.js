import React, { Component } from 'react';

import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Sugerir extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
                    <Icon name="bars" size={30} color={'#ddd'} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Sugerir novo ecoponto</Text>

            </View>
        );
    }
}