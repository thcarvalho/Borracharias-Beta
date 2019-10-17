/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Firebase from "../controller/Firebase";

export default class Maps extends Component {
  state = {
    isLoading: true,
    region: null,
    markers: [],
  };
  mapRef = null;
  Firebase = new Firebase();
  coords = null;


  mostrarDestinacoes(doc) {
    let id = doc.id;
    let latitude = doc.data().latitude;
    let longitude = doc.data().longitude;
    let title = doc.data().ecoponto;
    let telefone = (doc.data().telefone == '') ? ' ' : (' - Tel: ' + doc.data().telefone);
    let description = doc.data().endereco + ', ' + doc.data().numero + telefone;
    console.log(id);

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

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps.navigation.getParam('latitude'));
    console.log(nextProps.navigation.getParam('longitude'));
    this.coords = { latitude: nextProps.navigation.getParam('latitude'), longitude: nextProps.navigation.getParam('longitude'), latitudeDelta: 0.0462, longitudeDelta: 0.0261, };
  }

  centralizarMarker = (coordinates) => {
    console.log(coordinates);
    if (this.coords !== null) {
      this.mapRef.animateToRegion(coordinates, 1);
    }
    this.coords = null;
  }

  componentWillMount() {
    this.listener = this.props.navigation.addListener('didFocus', () => {
      if (this.coords === null) {
        return null;
      } else {
        this.centralizarMarker(this.coords);
      }
    });
    this.Firebase.recuperarDestinacao(true, snapshot => {
      this.setState({ markers: [] });
      snapshot.forEach(doc => {
        this.mostrarDestinacoes(doc);
      });
    })
  }


  async componentDidMount() {
    console.log(this.mapRef);
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
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
        <MapView
          ref={(ref) => { this.mapRef = ref }}
          style={styles.map}
          initialRegion={this.state.region}
          region={this.state.region}
          loadingEnabled
          showsUserLocation
          followUserLocation
          showsCompass={false}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={marker.id}
              // ref={(ref) => { this.markers[ref.id] = marker; }}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.toggle}
          onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={20} color={'#00695c'} />
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
    paddingTop: 30,
  },
});

