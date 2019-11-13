/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, Dimensions, StyleSheet, View, Text, TextInput, ToastAndroid } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import Firebase from "../../controller/Firebase";
import firebase from "react-native-firebase"

export default class ModalConfirmacao extends Component {
  state = {
    senha: '',
    passwordShow: false,
  };

  Firebase = new Firebase()

  tooglePassword = () => {
    const { passwordShow } = this.state;
    this.setState({ passwordShow: !passwordShow });
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

  reauthenticate = (currentPassword) => {
    var user = this.Firebase.auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  delete = (currentPassword) => {
    if (currentPassword != null) {
        this.reauthenticate(currentPassword).then(() => {
        var user = this.Firebase.auth.currentUser;
        user.delete().then(() => {
          ToastAndroid.show('Sua conta foi excluida', ToastAndroid.SHORT);
        }).catch((error) => {
          ToastAndroid.show('Ocorreu um erro', ToastAndroid.SHORT);
        });
      }).catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            ToastAndroid.show('Senha Incorreta', ToastAndroid.SHORT);
            break;

          default:
            ToastAndroid.show('Ocorreu um erro', ToastAndroid.SHORT);
            break;
        }
      });
    } else {
      ToastAndroid.show('Faltam dados obrigatórios', ToastAndroid.SHORT);
    }
  }

  closeModal = () => {
    this.props.closeModal();
  }

  render() {
    const { passwordShow, senha } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} disable={true} >
          <View style={[styles.modal, { width: this.state.width - 55 }]}>
            <Text style={styles.texto}>Senha:</Text>
            <View style={styles.cont}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TextInput
                  value={this.state.senha}
                  editable={true}
                  onChangeText={(senha) => this.setState({ senha })}
                  autoCapitalize="none"
                  style={styles.entradaTexto}
                  autoCorrect={false}
                  underlineColorAndroid={'#00695c'}
                  secureTextEntry={passwordShow ? false : true}
                />
                <TouchableOpacity onPress={this.tooglePassword} activeOpacity={0.8}>
                  {
                    this.state.passwordShow ?
                      (
                        <IconFA name={'eye-slash'} size={25} color={'#dcdcdc'} style={styles.icone} />
                      ) : (
                        <IconFA name={'eye'} size={25} color={'#dcdcdc'} style={styles.icone} />
                      )
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => { this.closeModal() }} style={styles.btnCancel}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.delete(senha)} style={styles.btnSalvar}>
                <Text style={styles.textoBotao}>Concluir</Text>
              </TouchableOpacity>
            </View>
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
    width: '88%',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icone: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 5,
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