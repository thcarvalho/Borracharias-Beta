/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, Dimensions, StyleSheet, View, Text, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import Firebase from "../../controller/Firebase";

import firebase from "react-native-firebase";

export default class ModalSenha extends Component {
  state = {
    senhaNova: '',
    senhaAtual: '',
    passwordShowNova: false,
    passwordShowAtual: false,
    isLoading: false,
  };

  Firebase = new Firebase()

  tooglePasswordAtual = () => {
    const { passwordShowAtual } = this.state;
    this.setState({ passwordShowAtual: !passwordShowAtual });
  }
  tooglePasswordNew = () => {
    const { passwordShowNova } = this.state;
    this.setState({ passwordShowNova: !passwordShowNova });
  }

  /*componentDidMount() {
  this.Firebase.refUsuarios
          .where('email', '==', this.Firebase.auth.currentUser.email)
    .onSnapshot(snapshot => {
      snapshot.forEach(doc => {
                  this.setState({ senha: doc.data().password });
      })
    })
  }*/

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
    this.props.modalSenha(false);
  }

  reauthenticate(senhaAtual) {
    var user = this.Firebase.auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, senhaAtual);
    return user.reauthenticateWithCredential(cred);
  }

  updatePassword(senhaNova, senhaAtual) {
    this.setState({ isLoading: true })
    try {
      if (senhaNova == null || senhaAtual == null || senhaNova === '' || senhaAtual === '') {
        this.setState({ isLoading: false })
        ToastAndroid.show('Faltam dados obrigatórios!', ToastAndroid.SHORT);
      } else {
        this.reauthenticate(senhaAtual)
          .then(() => {
            var user = this.Firebase.auth.currentUser;
            user.updatePassword(senhaNova)
              .then(() => {
                ToastAndroid.show('Senha alterada com sucesso', ToastAndroid.SHORT);
                this.setState({ isLoading: false })
                this.closeModal();
              })
              .catch((error) => {
                switch (error.code) {
                  case 'auth/weak-password':
                    ToastAndroid.show('Sua senha precisa ter mais de 6 caracteres', ToastAndroid.SHORT);
                    break;
                  default:
                    ToastAndroid.show('Erro ao solicitar troca de senha', ToastAndroid.SHORT);
                    break;
                  }
                  this.setState({ isLoading: false })
              });
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/wrong-password':
                ToastAndroid.show('Senha incorreta', ToastAndroid.SHORT);
                break;
              default:
                ToastAndroid.show('Erro ao solicitar troca de senha', ToastAndroid.SHORT);
                break;
            }
            this.setState({ isLoading: false })
          });
      }
    } catch (error) {
      ToastAndroid.show('Erro ao solicitar troca de senha', ToastAndroid.SHORT);
      console.log(error);
      this.setState({ isLoading: false })
    }

  }
  render() {
    const { passwordShowAtual, passwordShowNova, senhaAtual, senhaNova } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} disable={true} >
          <View style={[styles.modal, { width: this.state.width - 55 }]}>
            <Text style={styles.texto}>Senha Atual:</Text>
            <View style={styles.cont}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TextInput
                  value={senhaAtual}
                  editable={true}
                  onChangeText={senhaAtual => this.setState({ senhaAtual })}
                  autoCapitalize="none"
                  style={styles.entradaTexto}
                  autoCorrect={false}
                  underlineColorAndroid={'#00695c'}
                  secureTextEntry={passwordShowAtual ? false : true}
                />
                <TouchableOpacity onPress={this.tooglePasswordAtual} activeOpacity={0.8}>
                  {
                    this.state.passwordShowAtual ?
                      (
                        <IconFA name={'eye'} size={25} color={'#dcdcdc'} style={styles.icone} />
                      ) : (
                        <IconFA name={'eye-slash'} size={25} color={'#dcdcdc'} style={styles.icone} />
                      )
                  }
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.texto}>Nova senha:</Text>
            <View style={styles.cont}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TextInput
                  value={senhaNova}
                  editable={true}
                  onChangeText={senhaNova => this.setState({ senhaNova })}
                  autoCapitalize="none"
                  style={styles.entradaTexto}
                  autoCorrect={false}
                  underlineColorAndroid={'#00695c'}
                  secureTextEntry={passwordShowNova ? false : true}
                />
                <TouchableOpacity onPress={this.tooglePasswordNew} activeOpacity={0.8}>
                  {
                    this.state.passwordShowNova ?
                      (
                        <IconFA name={'eye'} size={25} color={'#dcdcdc'} style={styles.icone} />
                      ) : (
                        <IconFA name={'eye-slash'} size={25} color={'#dcdcdc'} style={styles.icone} />
                      )
                  }
                </TouchableOpacity>
              </View>
            </View>
            {this.state.isLoading ?
              (
                <ActivityIndicator animating style={{ paddingTop: 20 }} size="small" color={'#009688'} />
              ) : (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => { this.closeModal() }} style={styles.btnCancel}>
                    <Text style={styles.textoBotao}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSalvar} onPress={() => { this.updatePassword(senhaNova, senhaAtual) }}>
                    <Text style={styles.textoBotao}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </TouchableOpacity>
      </View>
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
    height: 250,
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
    width: '86%',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  icone: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 5,
  },
  btnCancel: {
    alignItems: 'flex-start',
  },
  btnSalvar: {
    borderLeftWidth: 1,
    borderLeftColor: '#dcdcdc',
    alignItems: 'flex-end',
  },
  textoBotao: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 6,
    paddingHorizontal: 26,
    color: '#009688',
  },
});