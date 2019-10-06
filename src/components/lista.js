/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, ListItem } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import { recuperarDestinacoes } from "../Firebase";

export default class Lista extends Component {
state = {
  destinacoes: [],
};

async mostrarDestinacoes(doc){
  let id = doc.id;
  let nome = doc.data().ecoponto;
  let descricao = doc.data().endereco + ', ' + doc.data().numero;
  
  this.setState({ destinacoes: this.state.destinacoes.concat([{
    id,
    nome,
    descricao,
  }]) });
}
async componentDidMount(){
  recuperarDestinacoes(this);
}

keyExtractor = (item, index ) => index.toString()

renderItem = ({ item }) => (
  <ListItem
    title = {destinacao.name}
    subtitle = {destinacao.descricao}
    bottomDivider
    chevron
  />
)

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <TouchableOpacity style={{padding: 20}} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'}/>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Lista</Text>
        {this.state.destinacoes.map(destinacao => (

        <View>
          <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={this.mostrarDestinacoes}
          />      
        </View>
        ))}
      </ScrollView>
    );
  }
}
