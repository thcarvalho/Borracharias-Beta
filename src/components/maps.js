/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  PermissionsAndroid,
  Text,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconA from 'react-native-vector-icons/AntDesign';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import Detalhes from "./detalhes";
import Firebase from "../controller/Firebase";

export default class Maps extends Component {
  state = {
    isLoading: true,
    region: null,
    userRegion: null,
    markers: [],
    detalhar: false,
    modal: {},
    geolocalizacao: null,
  };
  mapRef = null;
  coords = null;
  Firebase = new Firebase();

  async permitirMapa() {
    const geolocalizacao = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permitir geolocalização?',
        message: 'Por favor, para o uso correto de nosso aplicativo, permita o uso da Geolocalização',
        buttonNeutral: 'Pergunte depois',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      })
    if (geolocalizacao === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Liberado");
      this.setState({ geolocalizacao: true })
      this.recuperarLocalização();
    } else {
      console.log("Recusada");
      this.setState({ geolocalizacao: false })
    }



    // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
    //   .then(result => {
    //     if (result) {
    //       this.setState({ geolocalizacao: true });
    //       console.log("Liberado");
    //     } else {
    //       this.setState({ geolocalizacao: false });
    //       console.log("Recusada");
    //     }
    //   })


  }

  mostrarDestinacoes(doc) {
    let id = doc.id;
    let latitude = doc.data().latitude;
    let longitude = doc.data().longitude;
    let title = doc.data().ecoponto;
    let telefone = doc.data().telefone;
    let cep = doc.data().cep;
    let endereco = doc.data().endereco;
    let bairro = doc.data().bairro;
    let numero = doc.data().numero;
    let cidade = doc.data().cidade;
    let estado = doc.data().estado;

    console.log(id);

    this.setState({
      markers: this.state.markers.concat([{
        id,
        coordinate: {
          latitude,
          longitude,
        },
        title,
        cep,
        endereco,
        bairro,
        numero,
        cidade,
        estado,
        telefone,
      }])
    });

  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps.navigation.getParam('latitude'));
    console.log(nextProps.navigation.getParam('longitude'));
    this.coords = { latitude: nextProps.navigation.getParam('latitude'), longitude: nextProps.navigation.getParam('longitude'), latitudeDelta: 0.0462, longitudeDelta: 0.0261, };
    this.idMarker = nextProps.navigation.getParam('id');
  }

  centralizarMarker = (coordinates) => {
    const { markers } = this.state;
    console.log(coordinates);
    if (this.coords !== null) {
      this.mapRef.animateToRegion(coordinates, 1);
      for (let i = 0; i < markers.length; i++) {
        if (markers[i].id === this.idMarker) {
          this.openModal(i);
        }
      }
    }
    this.coords = null;
  }

  componentWillMount() {
    // this.permitirMapa();
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

  recuperarLocalização() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          userRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0462,
            longitudeDelta: 0.0261,
          },
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0462,
            longitudeDelta: 0.0261,
          },
          geolocalizacao: true,
        });
      },
      error => {
        this.setState({ geolocalizacao: false })
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  }

  async componentDidMount() {
    console.log(this.mapRef);
    this.recuperarLocalização();
  }

  openModal = (id) => {
    console.log(id);
    this.setState({
      detalhar: true,
      // region: {
      //   latitude: this.state.markers[id].coordinate.latitude,
      //   longitude: this.state.markers[id].coordinate.longitude,
      //   latitudeDelta: 0.0462,
      //   longitudeDelta: 0.0261,
      // },
      modal: {
        titulo: this.state.markers[id].title,
        cep: this.state.markers[id].cep,
        bairro: this.state.markers[id].bairro,
        endereco: this.state.markers[id].endereco,
        numero: this.state.markers[id].numero,
        cidade: this.state.markers[id].cidade,
        estado: this.state.markers[id].estado,
        tel: this.state.markers[id].telefone,
      }
    });
  }

  closeModal() {
    this.setState({
      detalhar: false,
    })
  }

  render() {
    const { detalhar, modal, geolocalizacao, region, userRegion } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
        <MapView
          ref={(ref) => { this.mapRef = ref }}
          style={[styles.map]}
          initialRegion={region}
          region={region}
          loadingEnabled
          followsUserLocation
          showsUserLocation
          showsCompass={false}
          showsMyLocationButton={false}
          onRegionChangeComplete={
            (region) => {
              this.setState({
                region: {
                  latitude: region.latitude,
                  longitude: region.longitude,
                  latitudeDelta: region.latitudeDelta,
                  longitudeDelta: region.longitudeDelta,
                },
              })
            }
          }
        >
          {
            this.state.markers.map((marker, index) => (
              <Marker
                key={marker.id}
                // ref={(ref) => { this.markers[ref.id] = marker; }}
                coordinate={marker.coordinate}
                onPress={() => { this.openModal(index) }}
              />
            ))
          }
        </MapView>
        {geolocalizacao === false && (
          <View style={styles.permissaoMapa}>
            <Text style={styles.textPermissao} >Para usar todas as funcionalidades de nosso App, por favor, habilite a Geolocalização</Text>
            <TouchableOpacity onPress={() => { this.permitirMapa() }}><Text style={styles.textPermitir} >PERMITIR</Text></TouchableOpacity>
          </View>
        )}
        {detalhar && (
          <View style={styles.modal}>
            <TouchableOpacity style={styles.close} onPress={() => { this.closeModal() }}>
              <IconA name='close' size={30} color={'#00695c'} />
            </TouchableOpacity>
            <Detalhes ecoponto={modal} />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.fab}
          onPress={() => {
            if (userRegion === null) {
              ToastAndroid.show('Por favor, aguarde enquanto recuperamos sua localização', ToastAndroid.SHORT);
            } else {
              this.mapRef.animateToRegion(userRegion, 1000);
            }
            console.log(region);
          }}
        >
          <IconMA name="my-location" size={30} color={'#00695c'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggle}
          onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={20} color={'#00695c'} />
        </TouchableOpacity>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  toggle: {
    position: 'absolute',
    padding: 20,
    paddingTop: 30,
  },
  fab: {
    height: 45,
    width: 45,
    borderRadius: 100,
    position: 'absolute',
    right: 10,
    top: 25,
    // borderWidth: 2.5,
    // borderColor: '#00695c',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  permissaoMapa: {
    borderTopColor: "#00695c",
    borderTopWidth: 1.5,
    position: "absolute",
    width: "100%",
    height: 80,
    bottom: 0,
    backgroundColor: "#fff",
  },
  textPermissao: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 14,
  },
  textPermitir: {
    paddingTop: 10,
    textAlign: "center",
    color: '#00695c',
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 245,
  },
  close: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 5,
  }
});
