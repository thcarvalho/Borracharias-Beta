/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Firebase from "../Firebase";

export default class Maps extends Component {
  state = {
    isLoading: true,
    region: null,
    markers: [],
  };
  Firebase = new Firebase();



  mostrarDestinacoes(doc) {
    let id = doc.id;
    let latitude = doc.data().latitude;
    let longitude = doc.data().longitude;
    let title = doc.data().ecoponto;
    let telefone = (doc.data().telefone == '') ? ' ' : (' - Tel: ' + doc.data().telefone);
    let description = doc.data().endereco + ', ' + doc.data().numero + telefone;

    console.log(description);

    this.setState({
      markers: this.state.markers.concat([{
        id,
        coordinate: {
          latitude,
          longitude,
        },
        title,
        description,
      }])
    });

  }

  componentWillMount() {
    this.Firebase.refDestinacoes
      .where("visivel", "==", true)
      .onSnapshot(snapshot => {
        this.setState({ markers: [] });
        snapshot.forEach(doc => {
          this.mostrarDestinacoes(doc);
        });
      });
  }

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
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
      },
    );

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region}
          loadingEnabled
          showsUserLocation
          followUserLocation
        >
          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.toggle}
          onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ccc'} />
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
  },
});

