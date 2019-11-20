/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMA from 'react-native-vector-icons/MaterialIcons';
import IconAD from 'react-native-vector-icons/AntDesign';

import Geolocation from '@react-native-community/geolocation';

import { ActionSheet } from "native-base";

import { SearchBar } from 'react-native-elements';
import { Menu, Provider } from 'react-native-paper';

import Firebase from "../controller/Firebase";

var buttons = ['Últimos Adicionados', 'Distância', 'A-Z', 'Bairro', 'Endereço', 'Voltar'];
var cancelIndex = 5;

export default class Lista extends Component {
  state = {
    destinacoes: [],
    isLoading: true,
    pesquisa: '',
    ordem: '0',
    filtroPesquisa: 'Bairro',
    resultado: [],
    visible: false,
    posicao: null,
  };
  Firebase = new Firebase();

  openMenu = () => this.setState({ visible: true });

  closeMenu = () => this.setState({ visible: false });

  listarDestinacoes(doc) {
    let id = doc.id;
    let nome = doc.data().ecoponto;
    let latitude = doc.data().latitude;
    let longitude = doc.data().longitude;
    let descricao = doc.data().endereco + ', ' + doc.data().bairro + ', ' + doc.data().numero;

    this.setState({
      destinacoes: this.state.destinacoes.concat([{
        id,
        nome,
        descricao,
        latitude,
        longitude,
      }]),
      isLoading: false,
    });
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  compare(a, b) {
    if (a.distancia < b.distancia) {
      return -1;
    }
    if (a.distancia > b.distancia) {
      return 1;
    }
    return 0;
  }

  listarDestinacoesPorDistancia(doc) {

    let id = doc.id;
    let nome = doc.data().ecoponto;
    let descricao = doc.data().endereco + ', ' + doc.data().bairro + ', ' + doc.data().numero;

    let latitude = doc.data().latitude;
    let longitude = doc.data().longitude;
    let lat2 = this.state.posicao.latitude;
    let lon2 = this.state.posicao.longitude;

    var R = 6371;
    var deltaLat = this.deg2rad(lat2 - latitude);
    var deltaLon = this.deg2rad(lon2 - longitude);
    var a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(this.deg2rad(latitude)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distancia = R * c;

    this.setState({
      destinacoes: this.state.destinacoes.concat([{
        id,
        nome,
        descricao,
        latitude,
        longitude,
        distancia,
      }]),
      isLoading: false,
    });
    this.setState({
      destinacoes: this.state.destinacoes.sort(this.compare),
      isLoading: false,
    });
    console.log(this.state.destinacoes);

  }

  listarPesquisa(doc) {
    let id = doc.id;
    let nome = doc.data().ecoponto;
    let descricao = doc.data().endereco + ', ' + doc.data().bairro + ', ' + doc.data().numero;
    let latitude = doc.data().latitude;
    let longitude = doc.data().longitude;

    this.setState({
      resultado: this.state.resultado.concat([{
        id,
        nome,
        descricao,
        latitude,
        longitude,
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

  recuperarLocalizacao() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          posicao: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
      });
  }

  async componentDidMount() {
    this.recuperarLocalizacao();
  }

  pesquisar(filtro, pesquisa) {
    this.setState({ pesquisa });
    console.log(pesquisa);

    if (filtro === 'Bairro') {
      this.Firebase.refDestinacoes
        .where("visivel", "==", true)
        .where('bairro', '>=', pesquisa)
        .where('bairro', '<=', pesquisa + '\uf8ff')
        .onSnapshot(snapshot => {
          this.setState({ isLoading: true, resultado: [] })
          snapshot.forEach(doc => {
            this.listarPesquisa(doc);
          })
        })

    } else if (filtro === 'Endereco') {
      this.Firebase.refDestinacoes
        .where("visivel", "==", true)
        .where('endereco', '>=', pesquisa)
        .where('endereco', '<=', pesquisa + '\uf8ff')
        .onSnapshot(snapshot => {
          this.setState({ isLoading: true, resultado: [] })
          snapshot.forEach(doc => {
            this.listarPesquisa(doc);
          })
        })
    } else if (filtro === 'Ecoponto') {
      this.Firebase.refDestinacoes
        .where("visivel", "==", true)
        .where('ecoponto', '>=', 'Ecoponto ' + pesquisa)
        .where('ecoponto', '<=', 'Ecoponto ' + pesquisa + '\uf8ff')
        .onSnapshot(snapshot => {
          this.setState({ isLoading: true, resultado: [] })
          snapshot.forEach(doc => {
            this.listarPesquisa(doc);
          })
        })
    }
  }

  filtrar(filtro) {
    this.setState({ filtroPesquisa: filtro, visible: false });
  }

  ordenar(ordem) {
    this.setState({ ordem, isLoading: true })
    console.log(ordem);
    switch (ordem) {
      case 0:
        this.Firebase.refDestinacoes
          .where("visivel", "==", true)
          .onSnapshot(snapshot => {
            this.setState({ destinacoes: [], isLoading: true });
            snapshot.forEach(doc => {
              this.listarDestinacoes(doc);
            });
          });
        break;
      case 1:
        this.recuperarLocalizacao();
        if (this.state.posicao === null) {
          alert("Para utilizar esta função, por favor habilite a geolocalização")
          break;
        } else {
          this.Firebase.refDestinacoes
            .where("visivel", "==", true)
            .onSnapshot(snapshot => {
              this.setState({ destinacoes: [], isLoading: true });
              snapshot.forEach(doc => {
                this.listarDestinacoesPorDistancia(doc);
              });
            });
          break;
        }
      case 2:
        this.Firebase.refDestinacoes
          .where("visivel", "==", true)
          .orderBy('ecoponto')
          .onSnapshot(snapshot => {
            this.setState({ destinacoes: [], isLoading: true });
            snapshot.forEach(doc => {
              this.listarDestinacoes(doc);
            });
          });
        break;
      case 3:
        this.Firebase.refDestinacoes
          .where("visivel", "==", true)
          .orderBy('bairro')
          .onSnapshot(snapshot => {
            this.setState({ destinacoes: [], isLoading: true });
            snapshot.forEach(doc => {
              this.listarDestinacoes(doc);
            });
          });
        break;
      case 4:
        this.Firebase.refDestinacoes
          .where("visivel", "==", true)
          .orderBy('endereco')
          .onSnapshot(snapshot => {
            this.setState({ destinacoes: [], isLoading: true });
            snapshot.forEach(doc => {
              this.listarDestinacoes(doc);
            });
          });
        break;
      case 5:
        this.Firebase.refDestinacoes
          .where("visivel", "==", true)
          .onSnapshot(snapshot => {
            this.setState({ destinacoes: [], isLoading: true });
            snapshot.forEach(doc => {
              this.listarDestinacoes(doc);
            });
          });
        break;
      default:
        alert('Ocorreu um erro ao ordenar');
        break;
    }
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
      <View style={styles.indicador}>
        <ActivityIndicator animating={this.state.isLoading ? true : false} size="large" />
      </View>
    );
  };

  render() {
    const { destinacoes, pesquisa, resultado, filtroPesquisa } = this.state;
    return (
      <Provider>
        <View style={{ flex: 1 }}>
          <StatusBar translucent={true} backgroundColor='transparent' barStyle='dark-content' />
          <View style={styles.barraDrawer}>
            <TouchableOpacity style={{ padding: 20, paddingVertical: 25 }} onPress={this.props.navigation.openDrawer}>
              <Icon name="bars" size={20} color={'#fff'} />
            </TouchableOpacity>
            <SearchBar
              round
              placeholder={'Pesquisar por ' + filtroPesquisa}
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
              autoCapitalize={'sentences'}
              searchIcon={false}
              onChangeText={(pesquisa) => this.pesquisar(filtroPesquisa, pesquisa)}
              value={pesquisa}
            />
            <Menu
              style={{ paddingTop: 50 }}
              visible={this.state.visible}
              onDismiss={this.closeMenu}
              anchor={
                <TouchableOpacity onPress={this.openMenu} style={{ paddingVertical: 25 }}>
                  <IconAD name="filter" size={20} color={'#fff'} />
                </TouchableOpacity>
              }
            >
              <Menu.Item onPress={() => this.filtrar('Bairro')} title="Bairro" />
              <Menu.Item onPress={() => this.filtrar('Ecoponto')} title="Ecoponto" />
              <Menu.Item onPress={() => this.filtrar('Endereco')} title="Endereço" />
            </Menu>
          </View>
          {this.state.isLoading ? (
            <ActivityIndicator style={{ paddingTop: 200 }} animating size="large" color={'#009688'} />
          ) : (
              resultado !== '' ? (
                pesquisa !== '' ? (
                  <FlatList
                    data={resultado}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Maps', {
                            latitude: item.latitude,
                            longitude: item.longitude,
                            id: item.id,
                          });
                        }}
                        activeOpacity={0.5}
                        style={styles.container}
                      >
                        <Text style={styles.titulo}>{item.nome}</Text>
                        <Text style={styles.subtitulo}>{item.descricao}</Text>
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                    <FlatList
                      data={destinacoes}
                      keyExtractor={item => item.id}
                      ItemSeparatorComponent={this.renderSeparator}
                      ListFooterComponent={this.renderFooter}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('Maps', {
                              latitude: item.latitude,
                              longitude: item.longitude,
                              id: item.id,
                            });
                          }
                          }
                          activeOpacity={0.5}
                          style={styles.container}
                        >
                          <Text style={styles.titulo}>{item.nome}</Text>
                          <Text style={styles.subtitulo}>{item.descricao}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  )
              ) : (
                  <View>
                    <Text>Nenhum resultado encontrado :(</Text>
                  </View>
                )

            )
          }
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              ActionSheet.show(
                {
                  options: buttons,
                  cancelButtonIndex: cancelIndex,
                  title: 'Ordenar por...',
                },
                buttonIndex => {
                  console.log(buttonIndex);
                  this.ordenar(buttonIndex);
                }
              );
            }
            }
            style={styles.fab}
          >
            <IconMA name="sort" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    right: 10,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
    elevation: 5,
  },
  indicador: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#CED0CE'
  },
  barraDrawer: {
    backgroundColor: '#009688',
    flexDirection: 'row',
    elevation: 3,
    paddingTop: 20,
  },
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
    color: '#696969',
  },
});
