/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from "../controller/Firebase";
export default class CadastrarDestinacao extends Component {
  state = {
    sugestoes: [],
    isLoading: true,
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
      }]),
      isLoading: false,
    });
  }

  componentWillMount() {
    this.Firebase.recuperarDestinacao(false,snapshot => {
        this.setState({ sugestoes: [] });
        snapshot.forEach(doc => {
          console.log(doc.data());
          this.mostrarSugestoes(doc);
        });
      });
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
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE' }}>
        <ActivityIndicator animating={this.state.isLoading ? true : false} size="large" />
      </View>
    );
  };

  render() {
    const {sugestoes, isLoading} = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content'/>
        <View style={{backgroundColor:'#009688', flexDirection: 'row', elevation: 3, paddingTop: 20}}>
          <TouchableOpacity style={{ padding: 20}} onPress={this.props.navigation.openDrawer}>
            <IconFA name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, textAlignVertical: 'center', color: '#fff', fontSize: 20}}>Cadastrar Destinação</Text>
        </View>
        {
          sugestoes.length === 0 && isLoading === false
          ? (
            <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Nenhuma sugestao pendente</Text>
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
                      <IconFA name="plus" size={27} color={'#00695c'} backgroundColor={'red'} onPress={() => {this.aceitarSugestao(item.id)}}/>
                    </View>
                    <View style={{flexDirection:'row', alignItems: 'baseline', justifyContent: 'space-between', marginRight: 20, alignContent: 'flex-end', paddingTop: 4}}>
                      <Text style={styles.subtitulo}>{item.descricao}</Text>
                      <IconFA name="trash" size={27} color={'#00695c'} onPress={() => {this.recusarSugestao(item.id)}}/>
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
