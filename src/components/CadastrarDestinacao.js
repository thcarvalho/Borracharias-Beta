/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from "../Firebase";

export default class CadastrarDestinacao extends Component {
  state = {
    sugestoes: [],
  };
  Firebase = new Firebase();


  aceitarSugestao(id) {    
    this.Firebase.refDestinacoes
      .doc(id)
      .update({
        visivel: true,
      })
      .then(() => {
        alert("Sugestao aceita");
      })
      .catch((error) => console.log(error))
  }
  recusarSugestao(id) {
    this.Firebase.refDestinacoes
      .doc(id)
      .delete()
      .then(() => {
        alert("Sugestao recusada");
      })
      .catch((error) => console.log(error))
  }


  mostrarSugestoes(doc) {
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

  componentWillMount() {
    this.Firebase.refDestinacoes
      .where("visivel", "==", false)
      .onSnapshot(snapshot => {
        this.setState({ sugestoes: [] });
        snapshot.forEach(doc => {
          console.log(doc.data());
          this.mostrarSugestoes(doc);
        });
      });
  }

  render() {
    const { sugestoes } = this.state;
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
                  <Text onPress={() => { this.aceitarSugestao(sugestao.id) }}>NOME ECOPONTO: {sugestao.nome}</Text>
                  <Text onPress={() => { this.recusarSugestao(sugestao.id) }}>ENDERECO: {sugestao.descricao}</Text>
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
