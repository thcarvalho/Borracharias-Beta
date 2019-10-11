/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { SearchBar } from 'react-native-elements';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import Firebase from "../controller/Firebase";

export default class Lista extends Component {
  state = {
    destinacoes: [],
    isLoading: true,
    pesquisa: '',
  };
  _menu = null;
  Firebase = new Firebase();

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  listarDestinacoes(doc) {
    let id = doc.id;
    let nome = doc.data().ecoponto;
    let descricao = doc.data().endereco + ', ' + doc.data().numero;

    this.setState({
      destinacoes: this.state.destinacoes.concat([{
        id,
        nome,
        descricao,
      }]),
      isLoading: false,
    });

  }

  componentWillMount() {
    this.Firebase.recuperarDestinacao(true, snapshot => {
      this.setState({ destinacoes: [], isLoading: true });
      snapshot.forEach(doc => {
        this.listarDestinacoes(doc);
      });
    });
  }

  renderSeparator = () => {
    return (
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
    const { destinacoes, pesquisa } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
        <View style={{ backgroundColor: '#009688', flexDirection: 'row', elevation: 3, paddingTop: 20 }}>
          <TouchableOpacity style={{ padding: 20, paddingVertical: 25 }} onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <SearchBar
            round
            placeholder="Pesquisar Ecopontos"
            containerStyle={{
              backgroundColor: "#009688",
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              width: '73%',
              paddingHorizontal: 0,
            }}
            inputStyle={{
              backgroundColor: "#00695c",
              color: '#fff',
            }}
            inputContainerStyle={{
              backgroundColor: "#00695c",
              width: '90%',
              marginTop: 2,
            }}
            // searchIcon={() => <Icon name="search" size={17} color={'#708b91'}/>}
            searchIcon={false}
            onChangeText={(pesquisa) => this.setState({ pesquisa })}
            value={pesquisa}
          />

          <Menu
            ref={this.setMenuRef}
            button={
              <TouchableOpacity onPress={this.showMenu} style={{ paddingVertical: 25 }}>
                <Icon name="sort-amount-up" size={20} color={'#fff'} />
              </TouchableOpacity>
            }
          >
            <MenuItem>Distância</MenuItem>
            <MenuItem>Endereço</MenuItem>
            <MenuItem>Bairro</MenuItem>
          </Menu>



        </View>
        <FlatList
          data={destinacoes}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Text style={styles.titulo}>{item.nome}</Text>
              <Text style={styles.subtitulo}>{item.descricao}</Text>
            </View>
          )}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginTop: 5,
    paddingVertical: 5,
  },
  titulo: {
    fontSize: 20,
  },
  subtitulo: {
    fontSize: 18,
    color: '#696969'
  }
});