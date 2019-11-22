/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, View, Text, TextInput, ToastAndroid, ActivityIndicator } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Firebase from "../../controller/Firebase";

import firebase from "react-native-firebase";

export default class ModalEmail extends Component {
  state = {
    email: '',
    senha: '',
    passwordShow: false,
    isLoading: false,
  };

  Firebase = new Firebase()

  componentDidMount() {
    this.Firebase.refUsuarios
      .where('email', '==', this.Firebase.auth.currentUser.email)
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          this.setState({ email: doc.data().email, id: doc.id });
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

  reauthenticate = (senhaAtual) => {
    var user = this.Firebase.auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email, senhaAtual);
    return user.reauthenticateWithCredential(cred);
  }

  updateEmail = (senha, email) => {
    this.setState({ isLoading: true });
    if (senha == null || senha === '' || email == '') {
      ToastAndroid.show('Faltam dados obrigatórios!', ToastAndroid.SHORT);
      this.setState({ isLoading: false });

    } else {
      this.reauthenticate(senha)
        .then(() => {
          var user = this.Firebase.auth.currentUser;
          user.updateEmail(email)
            .then(() => {
              this.Firebase.refUsuarios
                .doc(this.state.id)
                .update({
                  email,
                })
                .then(() => {
                  ToastAndroid.show('Email alterado com sucesso', ToastAndroid.SHORT);
                  this.closeModal();
                  this.setState({ isLoading: false });
                })
                .catch(error => {
                  ToastAndroid.show('Não foi possivel alterar seu nome', ToastAndroid.SHORT);
                  this.setState({ isLoading: false });
                })
            })
            .catch((error) => {
              switch (error.code) {
                case 'auth/invalid-email':
                  ToastAndroid.show('Email invalido', ToastAndroid.SHORT);
                  break;
                case 'auth/email-already-in-use':
                  ToastAndroid.show('Esse email já está em uso', ToastAndroid.SHORT);
                  break;
                default:
                  ToastAndroid.show('Erro ao solicitar troca de e-mail', ToastAndroid.SHORT);
                  break;
              }
              this.setState({ isLoading: false });
            });
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/wrong-password':
              ToastAndroid.show('Senha incorreta', ToastAndroid.SHORT);
              break;
            default:
              ToastAndroid.show('Erro ao solicitar troca de e-mail', ToastAndroid.SHORT);
              break;
          }
          this.setState({ isLoading: false });
        });
    }
  }

  closeModal = () => {
    this.props.modalEmail(false);
  }

  tooglePassword = () => {
    const { passwordShow } = this.state;
    this.setState({ passwordShow: !passwordShow });
  }

  render() {
    const { email, senha, passwordShow } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} disable={true} >
          <View style={[styles.modal, { width: this.state.width - 55 }]}>
            <Text style={styles.texto}>Email Novo:</Text>
            <View style={styles.cont}>
              <TextInput
                value={this.state.email}
                editable={true}
                onChangeText={(email) => this.setState({ email })}
                autoCapitalize="none"
                keyboardType='email-address'
                style={styles.entradaTexto}
                underlineColorAndroid={'#00695c'}
                autoCorrect={false}
              />
              <View>
                <Text style={styles.texto}>Senha Atual:</Text>
                <View style={styles.cont}>
                  <View style={styles.posicaoIcone}>
                    <TextInput
                      value={senha}
                      editable={true}
                      onChangeText={senha => this.setState({ senha })}
                      autoCapitalize="none"
                      style={styles.entradaTexto}
                      autoCorrect={false}
                      underlineColorAndroid={'#00695c'}
                      secureTextEntry={passwordShow ? false : true}
                    />
                    <TouchableOpacity style={styles.alinhamentoIcone} onPress={this.tooglePassword} activeOpacity={0.8}>
                      {
                        this.state.passwordShow ?
                          (
                            <IconFA name={'eye'} size={25} color={'#dcdcdc'} style={styles.icone} />
                          ) : (
                            <IconFA name={'eye-slash'} size={25} color={'#dcdcdc'} style={styles.icone} />
                          )
                      }
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            {this.state.isLoading ?
              (
                <ActivityIndicator animating style={{ paddingTop: 20 }} size="small" color={'#009688'} />
              ) : (
                <View style={styles.alinhamentoBotoes}>
                  <TouchableOpacity onPress={() => { this.closeModal() }} style={styles.btnCancel}>
                    <Text style={styles.textoBotao}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnSalvar} onPress={() => { this.updateEmail(senha, email) }}>
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
    height: 220,
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
  entradaTextoSenha: {
    width: '96%',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  posicaoIcone: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  alinhamentoIcone: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
  icone: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginBottom: 5,
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