/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, StyleSheet, Text } from 'react-native';

export default class Detalhes extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>{this.props.ecoponto.titulo}</Text>
                <View style={styles.descricao}>
                    <Text>{this.props.ecoponto.endereco} N°{this.props.ecoponto.numero}</Text>
                    <Text>Bairro: {this.props.ecoponto.bairro}</Text>
                    <Text>CEP: {this.props.ecoponto.cep}</Text>
                    <Text>{this.props.ecoponto.cidade} - {this.props.ecoponto.estado}</Text>
                    <Text>Tel: {this.props.ecoponto.tel == '' ? 'N/A' : this.props.ecoponto.tel}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        borderTopColor: "#00695c",
        borderTopWidth: 1.5,
        borderBottomColor: "#00695c",
        borderBottomWidth: 1.5,
        elevation: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        padding: 5,
        color: '#00695c',
    },
    descricao: {
        fontSize: 20,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 3,
    },
})
