/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Geocoder from 'react-native-geocoding';
import { ScrollView } from 'react-native-gesture-handler';

var cepPromise = require("cep-promise");

import Firebase from "../controller/Firebase";
import Ecoponto from "../model/Ecoponto";

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
        <View style={{ backgroundColor: '#009688', flexDirection: 'row', elevation: 3, paddingTop: 20 }}>
          <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, textAlignVertical: 'center', color: '#fff', fontSize: 20 }}>Sugerir Novo Eco ponto</Text>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Nome do Ecoponto"
              onChangeText={(ecoponto) => { this.setState({ ecoponto }) }}
              value={ecoponto}
            />

            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="CEP"
              onChangeText={(cep) => { this.setState({ cep }) }}
              onBlur={() => { this.recuperarCEP(cep) }}
              value={cep}
            />

            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Endereço"
              onChangeText={(endereco) => { this.setState({ endereco }) }}
              value={endereco}
            />

            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Bairro"
              onChangeText={(bairro) => { this.setState({ bairro }) }}
              value={bairro}
            />

            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Número"
              onChangeText={(numero) => { this.setState({ numero }) }}
              value={numero}
            />


            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Cidade"
              onChangeText={(cidade) => { this.setState({ cidade }) }}
              value={cidade}
            />

            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Estado"
              onChangeText={(estado) => { this.setState({ estado }) }}
              value={estado}
            />

            <TextInput
              style={styles.caixasTexto}
              underlineColorAndroid="transparent"
              placeholder="Telefone"
              onChangeText={(telefone) => { this.setState({ telefone }) }}
              value={telefone}
            />
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
    marginTop: 30,
    alignItems: 'center',
  },
  caixasTexto: {
    width: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  botao: {
    alignItems: 'center',
    width: 300,
    borderRadius: 20,
    backgroundColor: '#00695c',
    padding: 12,
    marginTop: 8,
    marginBottom: 30,
    fontSize: 16,
  },
});