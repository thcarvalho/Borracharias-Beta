<<<<<<< HEAD
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Image, SafeAreaView, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import Hr from "react-native-hr-component";
import Firebase from "../controller/Firebase";

import ModalNome from "./Perfil/ModalNome";
import ModalEmail from "./Perfil/ModalEmail";
import ModalSenha from "./Perfil/ModalSenha";
import ModalExcluirConta from "./Perfil/ModalExcluirConta";
import ModalConfirmacao from "./Perfil/ConfirmacaoExclusao";

export default class EditarPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            nome: '',
            email: '',
            modalVisibleNome: false,
            ModalVisibleEmail: false,
            ModalVisibleSenha: false,
            ModalVisibleExcluir: false,
            modalVisibleConfirmacao: false,
        };
        Dimensions.addEventListener('change', (e) => {
            this.setState(e.window);
        });
    }

    Firebase = new Firebase()

    componentDidMount() {
        this.Firebase.refUsuarios
            .where('email', '==', this.Firebase.auth.currentUser.email)
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({ nome: doc.data().nome });
                    this.setState({ email: doc.data().email });
                })
            })
    }

    modalNome = (bool) => {
        this.setState({ modalVisibleNome: bool });
    }
    modalEmail = (bool) => {
        this.setState({ ModalVisibleEmail: bool });
    }
    modalSenha = (bool) => {
        this.setState({ ModalVisibleSenha: bool });
    }
    modalExcluirConta = (bool) => {
        this.setState({ ModalVisibleExcluir: bool });
    }

    modalConfirmacao = (bool) => {
        this.setState({ modalVisibleConfirmacao: bool });
    }

    closeModal = (bool) => {
        this.setState({ modalVisibleConfirmacao: bool });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#dcdcdc' }}>
                <View style={{ backgroundColor: '#009688', flexDirection: 'row', elevation: 3, paddingTop: 20 }}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
                        <Icon name="bars" size={20} color={'#fff'} />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 10, textAlignVertical: 'center', color: '#fff', fontSize: 20 }}>Editar Perfil</Text>
                </View>

                <SafeAreaView style={styles.container}>
                    <View style={styles.linha}>
                        <TouchableOpacity style={styles.areaTexto} onPress={() => { this.modalNome(true) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name={'user'} size={25} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8 }} />
                                <View>
                                    <Text>Nome perfil:</Text>
                                    <Text
                                        onChangeText={(nome) => this.setState({ nome })}
                                        style={styles.texto}
                                    >{this.state.nome}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.linha}>
                        <TouchableOpacity style={styles.areaTexto} onPress={() => { this.modalEmail(true) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name={'envelope'} size={25} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8 }} />
                                <View>
                                    <Text>E-mail:</Text>
                                    <Text
                                        onChangeText={(email) => this.setState({ email })}
                                        style={styles.texto}
                                    >{this.state.email}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 42 }}>
                        <TouchableOpacity style={styles.areaTexto} onPress={() => { this.modalSenha(true) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name={'lock'} size={25} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8 }} />
                                <View>
                                    <Text>Senha:</Text>
                                    <Text
                                        onChangeText={(senha) => this.setState({ senha })}
                                        style={styles.texto}
                                    >{this.state.senha}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Hr lineColor="#00695c" width={1} text="Conta" fontSize={12} textStyles={{ color: '#00695c' }} />

                    <View style={styles.linha}>
                        <TouchableOpacity style={styles.areaTexto} onPress={() => { this.modalExcluirConta(true) }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name={'trash'} size={24} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8 }} />
                                <View>
                                    <Text style={styles.texto}>Excluir conta</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <Modal visible={this.state.modalVisibleNome} onRequestClose={() => { this.modalNome(false) }}
                    animationType='slide' transparent>
                    <ModalNome modalNome={this.modalNome} />
                </Modal>

                <Modal visible={this.state.ModalVisibleEmail} onRequestClose={() => { this.modalEmail(false) }}
                    animationType='slide' transparent>
                    <ModalEmail modalEmail={this.modalEmail} />
                </Modal>

                <Modal visible={this.state.ModalVisibleSenha} onRequestClose={() => { this.modalSenha(false) }}
                    animationType='slide' transparent>
                    <ModalSenha modalSenha={this.modalSenha} />
                </Modal>

                <Modal visible={this.state.ModalVisibleExcluir} onRequestClose={() => { this.modalExcluirConta(false) }}
                    animationType='slide' transparent>
                    <ModalExcluirConta modalExcluirConta={this.modalExcluirConta} />
                    {/* <View style={styles.containerExcluir}>
                        <View style={[styles.modal, { width: this.state.width - 55 }]}>
                            <Text style={styles.textoExcluir}>Deseja realmente excluir a conta?</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => { this.modalExcluirConta(false) }} style={styles.btnCancel}>
                                    <Text style={styles.textoBotao}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnSalvar} onPress={() => {
                                    this.modalConfirmacao(true);
                                    this.modalExcluirConta(false)
                                }}>
                                    <Text style={styles.textoBotao}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </ View>
                    </View> */}
                </Modal>

                {/* <Modal visible={this.state.modalVisibleConfirmacao} onRequestClose={() => { this.modalConfirmacao(false) }}
                    animationType='slide' transparent>
                    <ModalConfirmacao modalConfirmacao={this.modalConfirmacao} />
                </Modal> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 14,
    },
    texto: {
        color: '#00695c',
        fontSize: 20,
    },
    areaTexto: {
        marginTop: 4,
        padding: 22,
        width: 320,
    },
    linha: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },


    containerExcluir: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: 140,
        paddingTop: 10,
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    entradaTexto: {
        width: '96%',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoExcluir: {
        fontSize: 22,
        marginLeft: 8,
        color: '#009688',
        paddingVertical: 4,
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
=======
/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Image, SafeAreaView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import Hr from "react-native-hr-component";
import Firebase from "../controller/Firebase";

import ModalNome from "./Perfil/ModalNome";
import ModalEmail from "./Perfil/ModalEmail";
import ModalSenha from "./Perfil/ModalSenha";

export default class EditarPerfil extends Component{
    state= {
        nome: '',
        email: '',
        modalVisibleNome: false, 
        ModalVisibleEmail: false,
        ModalVisibleSenha: false,
    };
    
    Firebase = new Firebase()

    componentDidMount() {
		this.Firebase.refUsuarios
            .where('email', '==', this.Firebase.auth.currentUser.email)
			.onSnapshot(snapshot => {
				snapshot.forEach(doc => {
                    this.setState({ nome: doc.data().nome });
                    this.setState({ email: doc.data().email });
				})
			})
    }

        modalNome = (bool) => {
            this.setState({ modalVisibleNome: bool });
    }
         modalEmail = (bool) => {
        this.setState({ ModalVisibleEmail: bool });
    }
        modalSenha = (bool) => {
        this.setState({ ModalVisibleSenha: bool });
    }

    render(){
        return(
        <View style={{flex: 1, backgroundColor: '#dcdcdc'}}>
        <View style={{backgroundColor:'#009688', flexDirection: 'row', elevation: 3, paddingTop: 20}}>
          <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
            <Icon name="bars" size={20} color={'#fff'} />
          </TouchableOpacity>
          <Text style={{ paddingLeft: 10, textAlignVertical: 'center', color: '#fff', fontSize: 20}}>Editar Perfil</Text>
        </View>

        <SafeAreaView style = {styles.container}>
        <View style={styles.linha}>
        <TouchableOpacity style={styles.areaTexto} onPress={() => {this.modalNome(true)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'user'} size={25} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8}}/>
        <View>
        <Text>Nome perfil:</Text>
            <Text
            onChangeText={(nome) => this.setState({nome})}
            style={styles.texto}
          >{this.state.nome}</Text>
        </View>
        </View>
          </TouchableOpacity>
    </View>
    <View style={styles.linha}>
        <TouchableOpacity style={styles.areaTexto} onPress={() => {this.modalEmail(true)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'envelope'} size={25} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8}}/>
        <View>
        <Text>E-mail:</Text>
            <Text
            onChangeText={(email) => this.setState({email})}
            style={styles.texto}
          >{this.state.email}</Text>
        </View>
        </View>
        </TouchableOpacity>
    </View>
    <View style={{marginBottom: 42}}>
        <TouchableOpacity style={styles.areaTexto} onPress={() => {this.modalSenha(true)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'lock'} size={25} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8}}/>
        <View>
        <Text>Senha:</Text> 
            <Text
            onChangeText={(senha) => this.setState({senha})}
            style={styles.texto}
          >{this.state.senha}</Text>
    </View>
        </View>
        </TouchableOpacity>
    </View>
    <Hr lineColor="#00695c" width={1} text="Conta" fontSize={12} textStyles={{color:'#00695c'}} />

    <View style={styles.linha}>
        <TouchableOpacity style={styles.areaTexto}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'trash'} size={24} color={'#00695c'} style={{ marginRight: 10, marginLeft: -8}}/>
        <View>
        <Text style={styles.texto}>Excluir conta</Text>
        </View>
    </View>
        </TouchableOpacity>
    </View>
        </SafeAreaView>
        <Modal visible={this.state.modalVisibleNome} onRequestClose={() => {this.modalNome(false)}}
        animationType='slide' transparent>
            <ModalNome modalNome = {this.modalNome} />
        </Modal>

        <Modal visible={this.state.ModalVisibleEmail} onRequestClose={() => {this.modalEmail(false)}}
        animationType='slide' transparent>
            <ModalEmail modalEmail = {this.modalEmail} />
        </Modal>

        <Modal visible={this.state.ModalVisibleSenha} onRequestClose={() => {this.modalSenha(false)}}
        animationType='slide' transparent>
            <ModalSenha modalSenha = {this.modalSenha} />
        </Modal>
        </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 14,
    },  
    texto: {
        color: '#00695c',
        fontSize: 20,
    },
    areaTexto: {
        marginTop: 4,
        padding: 22,
        width: 320,
    },
    linha: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    }
>>>>>>> a6aeebc4e812880c11c54634257481462ea25720
});