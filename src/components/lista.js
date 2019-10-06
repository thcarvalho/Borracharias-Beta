/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';

import Firebase from "../Firebase";



export default class Lista extends Component {
  state = {
    destinacoes: [],
  };
  Firebase = new Firebase();

  async listarDestinacoes(doc) {
    let id = doc.id;
    let nome = doc.data().ecoponto;
    let descricao = doc.data().endereco + ', ' + doc.data().bairro + ', ' + doc.data().numero;

    this.setState({
      destinacoes: this.state.destinacoes.concat([{
        id,
        nome,
        descricao,
      }])
    });
  }

  async componentWillMount() {
    this.Firebase.refDestinacoes
      .where("visivel", "==", true)
      .onSnapshot(snapshot => {
        this.setState({ destinacoes: [] });
        snapshot.forEach(doc => {
          this.listarDestinacoes(doc);
        });
      });
  }

  render() {
    const { destinacoes } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Lista</Text>
        {
          destinacoes.length === 0
            ? (
              <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Não tem :(</Text>
            ) : (
              destinacoes.map(destinacao => (
                <View>
                  <Text>NOME ECOPONTO: {destinacao.nome}</Text>
                  <Text>ENDERECO: {destinacao.descricao}</Text>
                </View>
              ))
            )
        }
      </ScrollView>
    );
  }
}
