/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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

  renderSeparator = () => {
    return(
      <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: '#CED0CE',
        marginLeft: '0%',
      }}
      />
    );
  };
  
  renderFooter = () => {
    return(
    <View style={{paddingVertical:20, borderTopWidth:1, borderTopColor: '#CED0CE'}}>
      <ActivityIndicator animating size="large"/>
    </View>
    );
  };

  render() {
    const {sugestoes} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ padding: 20, backgroundColor:'#009688' }} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={30} color={'#ddd'} />
        </TouchableOpacity>
        
        {
          sugestoes.length === 0
          ? (
            <Text>Nenhuma sugestao pendente</Text>
          ) : (
        <ScrollView>
          <FlatList
            data={this.state.sugestoes}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <View style={{flexDirection:'row', alignItems: 'baseline', justifyContent: 'space-between', marginRight: 20}}>
              <Text style={styles.titulo}>{item.nome}</Text>
              <Icon name="pluscircleo" size={27} color={'#000'} backgroundColor={'red'} onPress={() => {this.aceitarSugestao()}}/>
              </View>
              <View style={{flexDirection:'row', alignItems: 'baseline', justifyContent: 'space-between', marginRight: 20, alignContent: 'flex-end', paddingTop: 4}}>
              <Text style={styles.subtitulo}>{item.descricao}</Text>
              <Icon name="delete" size={27} color={'#000'} onPress={() => {this.recusarSugestao()}}/>
              </View>
              </View>
          )}
        />
      </ScrollView>
          )
        }
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      marginLeft: 8,
      marginTop: 8,
      paddingVertical: 5,
  },
  titulo: {
    fontSize: 22,
  },
  subtitulo: {
    fontSize:18,
    color: '#696969',
    width: '92%',
    height: '90%'
  }
});