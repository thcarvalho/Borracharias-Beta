/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, SafeAreaView, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Hr from "react-native-hr-component";
import Firebase from "../controller/Firebase";

import ModalNome from "./Perfil/ModalNome";
import ModalEmail from "./Perfil/ModalEmail";
import ModalSenha from "./Perfil/ModalSenha";
import ModalExcluirConta from "./Perfil/ModalExcluirConta";

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
                <View style={styles.iconeDrawer}>
                    <TouchableOpacity style={{ padding: 20 }} onPress={this.props.navigation.openDrawer}>
                        <Icon name="bars" size={20} color={'#fff'} />
                    </TouchableOpacity>
                    <Text style={styles.tituloDrawer}>Editar Perfil</Text>
                </View>

                <SafeAreaView style={styles.container}>
                    <View style={styles.linha}>
                        <TouchableOpacity style={styles.areaTexto} onPress={() => { this.modalNome(true) }}>
                            <View style={styles.alinhamentos}>
                                <Icon name={'user'} size={25} color={'#00695c'} style={styles.icones} />
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
                            <View style={styles.alinhamentos}>
                                <Icon name={'envelope'} size={25} color={'#00695c'} style={styles.icones} />
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
                            <View style={styles.alinhamentos}>
                                <Icon name={'lock'} size={25} color={'#00695c'} style={styles.icones} />
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
                            <View style={styles.alinhamentos}>
                                <Icon name={'trash'} size={24} color={'#00695c'} style={styles.icones} />
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
                </Modal>
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
        fontSize: 20 
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
    icones:{
        marginRight: 10,
        marginLeft: -8 
    },
    alinhamentos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linha: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});