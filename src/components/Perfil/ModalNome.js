/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, View, Text, TextInput, ToastAndroid } from 'react-native';
import Firebase from "../../controller/Firebase";
import { ActivityIndicator } from 'react-native-paper';

export default class ModalNome extends Component {
  state = {
    nome: '',
    isLoading: false,
  };

  Firebase = new Firebase()

  componentDidMount() {
    this.Firebase.refUsuarios
      .where('email', '==', this.Firebase.auth.currentUser.email)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ nome: doc.data().nome, id: doc.id, });
        })
      })
  }

  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
    };
    Dimensions.addEventListener('change', (e) => {
      this.setState(e.window);
    });
  }

  closeModal = () => {
    this.props.modalNome(false);
  }

  updateNome = () => {
    this.setState({ isLoading: true })
    if (this.state.nome != '') {
      this.Firebase.refUsuarios
        .doc(this.state.id)
        .update({
          nome: this.state.nome,
        })
        .then(() => {
          ToastAndroid.show('Nome alterado com sucesso', ToastAndroid.SHORT);
          this.setState({ isLoading: false })
          this.closeModal();
        })
        .catch(error => {
          console.log(error)
          ToastAndroid.show('Não foi possivel alterar seu nome', ToastAndroid.SHORT);
          this.setState({ isLoading: false })
        })
    } else {
      this.setState({ isLoading: false })
      ToastAndroid.show('Por favor insira um nome válido', ToastAndroid.SHORT);
    }

  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} disable={true} >
          <View style={[styles.modal, { width: this.state.width - 55 }]}>
            <Text style={styles.texto}>Nome:</Text>
            <View style={styles.cont}>
              <TextInput
                value={this.state.nome}
                editable={true}
                onChangeText={(nome) => this.setState({ nome })}
                autoCapitalize="none"
                style={styles.entradaTexto}
                underlineColorAndroid={'#00695c'}
                autoCorrect={false}
              />
            </View>
            {this.state.isLoading ?
              (
                <ActivityIndicator animating style={{paddingTop: 20}} size="small" color={'#009688'} />
              ) : (
                <View style={styles.alinhamentoBotoes}>
                  <TouchableOpacity onPress={() => { this.closeModal() }} style={styles.btnCancel}>
                    <Text style={styles.textoBotao}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { this.updateNome() }} style={styles.btnSalvar}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </TouchableOpacity>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 160,
    paddingTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    marginLeft: 8,
    color: '#009688',
    paddingVertical: 4,
  },
  entradaTexto: {
    width: '96%',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alinhamentoBotoes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    alignItems: 'flex-start'
  },
  btnSalvar: {
    borderLeftWidth: 1,
    borderLeftColor: '#dcdcdc',
    alignItems: 'flex-end'
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 24,
    color: '#009688',
  },
});