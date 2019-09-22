/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { cadastrarDestinacao } from "../Firebase";
import Geocoder from 'react-native-geocoding';
import { ScrollView } from 'react-native-gesture-handler';
Geocoder.init("AIzaSyBGKCuuDcjsWjiXKPY27se2ShLmOgn-Y4Q", { language: "pt-br" });
export default class CadastrarDestinacao extends Component {
  state = {
    ecoponto: '',
    telefone: '',
    endereco: '',
    numero: '',
    cep: '',
    cidade: '',
    estado: '',
    latitude: '',
    longitude: '',
  }

  ecopontoChange = (ecoponto) => {
    this.setState({ ecoponto });
  }
  telefoneChange = (telefone) => {
    this.setState({ telefone });
  }
  enderecoChange = (endereco) => {
    this.setState({ endereco });
  }
  numeroChange = (numero) => {
    this.setState({ numero });
  }
  cepChange = (cep) => {
    this.setState({ cep });
  }
  cidadeChange = (cidade) => {
    this.setState({ cidade });
  }
  estadoChange = (estado) => {
    this.setState({ estado });
  }

  cadastrarDestinacao() {
    const { ecoponto, telefone, endereco, numero, cep, cidade, estado } = this.state;
    let latitude = '';
    let longitude = '';
    if (endereco === '' || numero === '' || cep === '' || cidade === '' || estado === '') {
      alert('Faltam dados obrigatórios');
    } else {
      let enderecoCompleto = endereco + ' ' + numero + ' ' + cep + ' ' + cidade + ' ' + estado;
      Geocoder.from(enderecoCompleto)
        .then(json => {
          let location = json.results[0].geometry.location;
          latitude = location.lat;
          longitude = location.lng;
          console.log(location);
          console.log(enderecoCompleto);
          cadastrarDestinacao(ecoponto, telefone, endereco, numero, cep, cidade, estado, latitude, longitude);
          this.setState({
            ecoponto: '',
            telefone: '',
            endereco: '',
            numero: '',
            cep: '',
            cidade: '',
            estado: '',
            latitude: '',
            longitude: '',
          })
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { ecoponto, telefone, endereco, numero, cep, cidade, estado } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Adicionar Ecoponto</Text>

        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="Nome do Ecoponto"
          onChangeText={this.ecopontoChange}
          value={ecoponto}
        />

        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="Telefone"
          onChangeText={this.telefoneChange}
          value={telefone}
        />

        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="Endereço"
          onChangeText={this.enderecoChange}
          value={endereco}
        />
        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="Numero"
          onChangeText={this.numeroChange}
          value={numero}
        />

        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="CEP"
          onChangeText={this.cepChange}
          value={cep}
        />

        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="Cidade"
          onChangeText={this.cidadeChange}
          value={cidade}
        />

        <TextInput
          style={styles.caixasTexto}
          underlineColorAndroid="transparent"
          placeholder="Estado"
          onChangeText={this.estadoChange}
          value={estado}
        />

        <TouchableOpacity style={styles.botao} onPress={() => { this.cadastrarDestinacao() }}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3CB371',
    flex: 1,
    alignItems: 'center',
  },
  caixasTexto: {
    width: 250,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 80,
    borderRadius: 8,
    backgroundColor: '#E0FFFF',
    padding: 10,
    marginTop: 25,
    marginBottom: 25,
  },
});
