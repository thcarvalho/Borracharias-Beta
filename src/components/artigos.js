/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, Text, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Artigos extends Component {
  state = {
    artigos: [
      {
        titulo: "Como realizar e lucrar com a reciclagem de pneu velho?",
        url: "https://www.vgresiduos.com.br/blog/reciclagem-de-pneu-velho/",
      },
      {
        titulo: "Reciclagem de pneus velhos: 30 modelos",
        url: "https://www.artesanatopassoapassoja.com.br/reciclagem-de-pneus/",
      },
      {
        titulo: "Aspectos ambientais sobre pneus inservíveis",
        url: "http://www1.sp.senac.br/hotsites/blogs/revistainiciacao/wp-content/uploads/2017/11/1-238_IC_ArtigoRevisado.pdf",
      },
      {
        titulo: "Como reciclar pneus",
        url: "https://www.pneusfacil.com.br/info/como_reciclar_pneu",
      },
      {
        titulo: "Cerca de 450 mil toneladas de pneus são descartados por ano no Brasil",
        url: "https://www.sestsenat.org.br/imprensa/noticia/cerca-de-450-mil-toneladas-de-pneus-sao-descartados-por-ano-no-brasil",
      },
      {
        titulo: "40 ideias de artesanatos com reciclagem de pneus usados",
        url: "https://artesanatobrasil.net/reciclagem-de-pneus-usados/",
      },
      {
        titulo: "Você sabe o tempo de decomposição de pneus? Entenda a importância de sua reciclagem",
        url: "https://www.dinamicambiental.com.br/blog/reciclagem/voce-decomposicao-pneus-entenda-importancia-reciclagem/",
      },
      {
        titulo: "Pneus velhos: 8 formas para reciclar",
        url: "https://www.greenme.com.br/consumir/reutilizacao-e-reciclagem/1300-8-formas-reciclar-pneus-velhos",
      },
      {
        titulo: "Reciclagem de Pneus: a importância do gestor de frota na redução dos impactos ambientais",
        url: "https://blog.texaco.com.br/ursa/reciclagem-de-pneus/",
      },
      {
        titulo: "Descarte inadequado de pneus gera prejuízos à sociedade",
        url: "https://www.akatu.org.br/noticia/descarte-inadequado-de-pneus-gera-prejuizos-a-sociedade/",
      },
      {
        titulo: "Você sabe como reciclar um pneu?",
        url: "https://www.bigtires.com.br/index.php?spsr=blog/post&post_id=35",
      },
      {
        titulo: "Dicas para reutilizar pneus na decoração",
        url: "https://sustentarqui.com.br/dicas-para-reutilizar-pneus-na-decoracao/",
      },
      {
        titulo: "23 Ideias criativas e realmente úteis para reutilizar pneus",
        url: "https://www.tudointeressante.com.br/2014/12/23-ideias-criativas-e-realmente-uteis-para-reutilizar-pneus.html",
      },
      {
        titulo: "Aprenda a reaproveitar pneus velhos na decoração da casa",
        url: "https://incrivel.club/criatividade-casa/aprenda-a-reaproveitar-pneus-velhos-na-decoracao-da-casa-111360/",
      },
      {
        titulo: "Artesanato com Pneus: +40 exemplos para você se inspirar",
        url: "https://www.vivadecora.com.br/revista/artesanato-com-pneus/",
      },
      {
        titulo: "25 Artesanatos com Pneus Imperdíveis ",
        url: "https://www.revistaartesanato.com.br/artesanato-com-pneu",
      },
      {
        titulo: "Reciclagem de Pneus Usados",
        url: "https://www.utep.com.br/reciclagem-de-pneus-usados.php",
      },
      {
        titulo: "Saiba como é feita a reciclagem de pneus",
        url: "https://www.dinamicambiental.com.br/blog/reciclagem/saiba-feita-reciclagem-pneus/",
      },
      {
        titulo: "Reciclagem de pneus",
        url: "https://www.infoescola.com/ecologia/reciclagem-de-pneus/",
      },
    ],
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
  render() {
    const { artigos } = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.iconeDrawer}>
          <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={styles.tituloDrawer}>Artigos</Text>
        </View>
        <FlatList
          data={artigos}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container} onPress={() => { Linking.openURL(item.url) }}>
              <Text style={styles.titulo}>{item.titulo}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  container: {
    marginLeft: 8,
    marginTop: 5,
    paddingVertical: 5,
  },
  iconeDrawer: {
    backgroundColor: '#009688',
    flexDirection: 'row',
    elevation: 3,
    paddingTop: 20
  },
  tituloDrawer: {
    paddingLeft: 10,
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 20,
  },
})
