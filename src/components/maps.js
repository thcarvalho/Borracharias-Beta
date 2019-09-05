import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

navigator.geolocation = require('@react-native-community/geolocation');

export default class Maps extends Component {
  
    state = { 
      isLoading: true,
      region: null
    };
  


  async componentDidMount(){
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
            region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0462,
                longitudeDelta: 0.0261,
            },
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
    
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          region = {this.state.region}
          loadingEnabled={true}
          showsUserLocation={true}
          followUserLocation={true}
        >
        </MapView>
        <TouchableOpacity style={styles.toggle} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ccc'}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  toggle: {
    position: 'absolute',  
    padding: 20, 
  }
});
 
