/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Geocoder from 'react-native-geocoding';
import { ScrollView } from 'react-native-gesture-handler';

var cepPromise = require("cep-promise");

import Firebase from "../controller/Firebase";
import Ecoponto from "../model/Ecoponto";
import { Hoshi } from 'react-native-textinput-effects';

Geocoder.init("AIzaSyBGKCuuDcjsWjiXKPY27se2ShLmOgn-Y4Q", { language: "pt-br" });
export default class Sugerir extends Component {
  state = {
    ecoponto: '',
    telefone: '',
    endereco: '',
    numero: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    latitude: '',
    longitude: '',
    isLoading: false,
  }
  Firebase = new Firebase();

  enviarSugestao() {
    const { ecoponto, cep, endereco, bairro, numero, cidade, estado, telefone } = this.state;
    let latitude = '';
    let longitude = '';
    if (ecoponto === '' || endereco === '' || numero === '' || bairro === '' || cep === '' || cidade === '' || estado === '') {
      ToastAndroid.show('Faltam dados obrigatórios', ToastAndroid.SHORT);
    } else {
      this.setState({ isLoading: true });
      let enderecoCompleto = endereco + ' ' + numero + ' ' + bairro + ' ' + cep + ' ' + cidade + ' ' + estado;
      Geocoder.from(enderecoCompleto)
        .then(json => {
          let location = json.results[0].geometry.location;
          latitude = location.lat;
          longitude = location.lng;
          console.log(location);
          console.log(enderecoCompleto);
          const destinacao = new Ecoponto(ecoponto, cep, endereco, bairro, numero, cidade, estado, telefone, latitude, longitude);
          this.Firebase.sugerirDestinacao(destinacao)
            .then(() => {
              ToastAndroid.show('Obrigado pela sugestão!', ToastAndroid.SHORT);
            })
            .catch((error) => console.log(error));
          this.setState({
            ecoponto: '',
            cep: '',
            endereco: '',
            bairro: '',
            numero: '',
            cidade: '',
            estado: '',
            telefone: '',
            latitude: '',
            longitude: '',
            isLoading: false,
          });
        })
        .catch(error => console.log(error));
    }
  }

  recuperarCEP(cep) {
    cepPromise(cep)
      .then((CEP) => {
        console.log(CEP);
        this.setState({
          estado: CEP.state,
          cidade: CEP.city,
          bairro: CEP.neighborhood,
          endereco: CEP.street,
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { ecoponto, telefone, endereco, numero, bairro, cep, cidade, estado, isLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.iconeDrawer}>
          <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.tituloDrawer}>Sugerir Novo Ecoponto</Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
          <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'Ecoponto'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={14}
              autoCapitalize={'none'}
              onChangeText={(ecoponto) => { this.setState({ ecoponto }) }}
              value={ecoponto}
            />
          </View>

        <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'CEP'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}
              onChangeText={(cep) => { this.setState({ cep }) }}
              onBlur={() => { this.recuperarCEP(cep) }}
              value={cep}
              keyboardType='numeric'
          />
          </View>

        <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'Endereço'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}
            onChangeText={(endereco) => { this.setState({ endereco }) }}
            value={endereco}
          />
          </View>

        <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'Bairro'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}             
              onChangeText={(bairro) => { this.setState({ bairro }) }}
              value={bairro}
          />
          </View>

        <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'Número'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}
              onChangeText={(numero) => { this.setState({ numero }) }}
              value={numero}
              keyboardType='numeric'
          />
          </View>


        <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'Cidade'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}
              onChangeText={(cidade) => { this.setState({ cidade }) }}
              value={cidade}
          />
          </View>  

          <View>
          <Hoshi
              style={styles.caixaTexto}
              label={'Estado'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}
              onChangeText={(estado) => { this.setState({ estado }) }}
              value={estado}
          />
          </View>

        <View>
        <Hoshi
              style={styles.caixaTexto}
              label={'Telefone'}
              borderColor={'#00695c'}
              borderHeight={3}
              inputPadding={16}
              autoCapitalize={'none'}
              onChangeText={(telefone) => { this.setState({ telefone }) }}
              value={telefone}
              keyboardType='phone-pad'
          />
          </View>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                this.enviarSugestao();
              }}
              activeOpacity={0.8} disabled={this.state.isLoading}
            >
              {
                this.state.isLoading ?
                  (
                    <ActivityIndicator animating size="small" color={'#fff'} />
                  ) : (
                    <Text style={{ color: '#dcdcdc' }}>ENVIAR</Text>
                  )
              }
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  caixaTexto: {
    width: 310,
    fontSize: 18,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 300,
    borderRadius: 200,
    backgroundColor: '#00695c',
    padding: 12,
    marginTop: 16,
    marginBottom: 26,
    fontSize: 16,
  },
  tituloDrawer:{
    paddingLeft: 10,
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 20
},
  iconeDrawer:{
    backgroundColor:'#009688',
    flexDirection: 'row',
    elevation: 3,
    paddingTop: 20,
},
});