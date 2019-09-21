import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Adicionar extends Component {
    render() {
       return (
         <View style={{flex: 1}}>
           <TouchableOpacity style={{padding: 20}} onPress={this.props.navigation.openDrawer}>
             <Icon name="bars" size={30} color={'#ddd'}/>
           </TouchableOpacity>
           <Text style={{textAlign: 'center', textAlignVertical: 'center'}}>Adicionar Eco ponto</Text>
   

          <TextInput 
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="Nome"
                />

                <TextInput 
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="Nome Eco ponto"
                />
                
                /*<TextInput 
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="CNPJ"
                />*/

                <TextInput 
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="Telefone"
                />                
                
                <TextInput
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="Endereço"
                />

                <TextInput
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="CEP"
                />

                <TextInput
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="Cidade"
                />

                <TextInput
                style={styles.caixasTexto}
                underlineColorAndroid="transparent"
                placeholder="Estado"
                />

                <TouchableOpacity style={styles.botao} onPress={botaoPressionado}>
                    <Text>Enviar</Text>
                </TouchableOpacity>
                <View>
        );
    }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3CB371',
    flex: 1,
    alignItems: 'center',
  },
    caixasTexto: {
    width: 250,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 80,
    borderRadius: 8,
    backgroundColor: '#E0FFFF',
    padding: 10,
    marginTop: 25,
    marginBottom: 25,
  },
});