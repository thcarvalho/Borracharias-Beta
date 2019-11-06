/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
//import Firebase from "../controller/Firebase";

export default class EditarPerfil extends Component{
    state= {
        usuarios: 'nome',
        usuarios2: 'email',
        usuarios3: 'senha',
    };
    
    render(){
        return(
        <View style={{flex: 1, backgroundColor: '#dcdcdc'}}>
        
        <View style = {styles.container}>
        <View>
        <TouchableOpacity>
            <Image style={styles.imagem} source={require('../assets/avatar-perfil.png')} />
        </TouchableOpacity>
        </View>
        
    <View>
            <Text>Nome perfil:</Text>
        <TouchableOpacity style={{flexDirection: 'row',}}>
            <TextInput
            value={this.state.usuarios}
            editable={true}
            onChangeText={(usuarios) => this.setState({usuarios})}
            autoCapitalize="none"
            style={styles.entradaTexto}
            underlineColorAndroid={'#00695c'}
            autoCorrect={false}
          />     
          <Icon name="edit" size={20} color={'#00695c'} />
          </TouchableOpacity>

    </View>
    <View>
            <Text>E-mail:</Text>
        <TouchableOpacity style={{flexDirection: 'row',}}>
            <TextInput
            value={this.state.usuarios2}
            editable={true}
            onChangeText={(usuarios2) => this.setState({usuarios2})}
            autoCapitalize="none"
            style={styles.entradaTexto}
            underlineColorAndroid={'#00695c'}
            keyboardType="email-address"
            autoCorrect={false}
          />     
          <Icon name="edit" size={20} color={'#00695c'} />
        </TouchableOpacity>
    </View>
    <View>
            <Text>Senha:</Text>
        <TouchableOpacity style={{flexDirection: 'row',}}>
            <TextInput
            value={this.state.usuarios3}
            editable={true}
            onChangeText={(usuarios3) => this.setState({usuarios3})}
            autoCapitalize="none"
            style={styles.entradaTexto}
            autoCorrect={false}
            underlineColorAndroid={'#00695c'}
            secureTextEntry={true}
          />     
              <Icon name="edit" size={20} color={'#00695c'} />
        </TouchableOpacity>
    </View>
        <TouchableOpacity style={styles.botao}>
              <Text style={{color: '#fff', fontSize: 18}}>Concluir</Text>
        </TouchableOpacity>

        </View>
            <TouchableOpacity style={styles.botaoExcluir}>
              <Text style={{color: '#fff', fontSize: 18}}>Excluir conta</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    entradaTexto: {
        width: 250,
        fontSize: 18,
        marginBottom: 8,
    },
    botao: {
        width: 250,
        marginTop: 12,
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#00695c',
        alignItems: 'center'
    },
    botaoExcluir:{
        width: '100%',
        backgroundColor: '#00695c',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    },
    imagem: {
        marginBottom: 40,
		width: 160,
		height: 160,
		borderRadius: 80,
		alignItems: 'center',
		paddingLeft: 10,
	},
});