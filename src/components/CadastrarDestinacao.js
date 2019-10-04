/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { recuperarSugestoes } from "../Firebase";

export default class CadastrarDestinacao extends Component {
  state = {
    sugestoes: [],

  };

  aceitarSugestao(){
    alert("Sugestao aceita")
  }
  recusarSugestao(){
    alert("Sugestao recusada")
  }

  mostrarDestinacoes(doc){
    let id = doc.id;
    let nome = doc.data().ecoponto;
    let descricao = doc.data().endereco + ', ' + doc.data().bairro + ', ' + doc.data().numero;

    this.setState({
      sugestoes: this.state.sugestoes.concat([{
        id,
        nome,
        descricao,
      }])
    });
  }

  componentWillMount(){
    recuperarSugestoes(this);
  }

  render() {
    const {sugestoes} = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'} />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Adicionar Ecoponto</Text>
        {
          sugestoes.length === 0
          ? (
            <Text>Nenhuma sugestao pendente</Text>
          ) : (
            sugestoes.map(sugestao => (
              <View>
                <Text onPress={() => {this.aceitarSugestao()}}>NOME ECOPONTO: {sugestao.nome}</Text>
                <Text onPress={() => {this.recusarSugestao()}}>ENDERECO: {sugestao.descricao}</Text>
              </View>
            ))
          )
        }
        
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
