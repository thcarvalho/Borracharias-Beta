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
    isLoadingEndereco: false,
    editavel: true,
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
          const destinacao = new Ecoponto(ecoponto, cep, endereco, bairro, numero, cidade, estado, telefone, latitude, longitude);
          this.Firebase.sugerirDestinacao(destinacao)
            .then(() => {
              ToastAndroid.show('Obrigado pela sugestão!', ToastAndroid.SHORT);
            })
            .catch((error) => ToastAndroid.show("Não foi possivel concluir sua sugestão: " + error, ToastAndroid.SHORT));
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
        .catch(error => {
          switch (error.code) {
            case 1:
              ToastAndroid.show('Endereço Invalido', ToastAndroid.SHORT);
              break;
            case 2:
              ToastAndroid.show('Erro ao pesquisar por endereço', ToastAndroid.SHORT);
              break;
            default:
              ToastAndroid.show('Erro ao sugerir endereço', ToastAndroid.SHORT);
              break;
          }
        });
    }
  }

  recuperarCEP(cep) {
    this.setState({ isLoadingEndereco: true })
    cepPromise(cep)
      .then((CEP) => {
        this.setState({
          estado: CEP.state,
          cidade: CEP.city,
          bairro: CEP.neighborhood,
          endereco: CEP.street,
          editavel: true,
          isLoadingEndereco: false
        })
      })
      .catch(error => {
        switch (error.type) {
          case 'service_error':
            ToastAndroid.show('Não foi possivel encontrar o CEP informado', ToastAndroid.SHORT);
            break;
          case 'validation_error':
            ToastAndroid.show('O CEP deve ter exatamente 8 números', ToastAndroid.SHORT);
            break;
          default:
            ToastAndroid.show('Erro ao recuperar CEP', ToastAndroid.SHORT);
            break;
        }
        this.setState({ editavel: true, isLoadingEndereco: false })
      })
  }

  render() {
    const { ecoponto, telefone, endereco, numero, bairro, cep, cidade, estado, isLoading, editavel, isLoadingEndereco } = this.state;
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
                onChangeText={(cep) => {
                  this.setState({ 
                    cep, 
                    editavel: false, 
                    isLoadingEndereco: true, 
                    estado: '',
                    cidade: '',
                    bairro: '',
                    endereco: '', })
                }}
                onBlur={() => { this.recuperarCEP(cep) }}
                value={cep}
                keyboardType='numeric'
              />
              {
                isLoadingEndereco &&
                  (
                    <ActivityIndicator style={{position: "absolute", right: 0, bottom: 25}} animating size="small" color={'#00695c'} />
                  )
              }
            </View>

            <View>
              <Hoshi
                style={styles.caixaTexto}
                label={'Endereço'}
                borderColor={'#00695c'}
                borderHeight={3}
                inputPadding={16}
                editable={editavel}
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
                isLoading ?
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
  tituloDrawer: {
    paddingLeft: 10,
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 20
  },
  iconeDrawer: {
    backgroundColor: '#009688',
    flexDirection: 'row',
    elevation: 3,
    paddingTop: 20,
  },
});