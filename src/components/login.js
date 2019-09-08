import React from 'react';
import {
	StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert
} from 'react-native';
//import Login from './components/Login';

export default class TelaPrincipal extends React.Component{
	render(){
	
	const botaoPressionado = () => {
		Alert.alert('Carregando');
	};
	const esqueceuSenha = () => {
		Alert.alert('Informar email para enviar nova senha');
	};
	const cadastro = () => {
		Alert.alert('Cadastro');
	}

	
		return(
			<View style={styles.container}>
				<View style={styles.tela}>
					<Text style={styles.textoLogin}>Login</Text>

					<TextInput style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Email'/>

					<TextInput secureTextEntry={true} style={styles.caixasTexto} underlineColorAndroid='transparent' placeholder='Senha'/>

					<TouchableOpacity onPress={botaoPressionado} style={styles.botao}>
						<Text>ENTRAR</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={esqueceuSenha}>
						<Text style={styles.links}>Esqueceu a senha?</Text>	
					</TouchableOpacity>

					<TouchableOpacity onPress={cadastro}>
						<Text style={styles.links}>Cadastre-se</Text>	
					</TouchableOpacity>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create ({
		container: {
			backgroundColor: '#3CB371',
			flex: 1,
			alignItems: 'center',
			flexDirection: 'center',
                        justifyContent: 'space-between'
		},
		tela: {
		flexDirection: 'center',
                justifyContent: 'space-between',
	        alignItems: 'center',
		},
		textoLogin: {
		        marginTop: 120,
		        marginBottom: 30,
			color: '#fff',
			fontSize: 38,
			fontFamily: 'Arial',
			fontWeight: 'bold'
		},
		caixasTexto: {
		        width: 250,
			borderRadius: 10,
			backgroundColor: '#fff',
			padding: 8,
			marginBottom: 10
		},
		botao: {
		        alignItems: 'center',
		        width: 80,
			borderRadius: 8,
			backgroundColor: '#E0FFFF',
			padding: 10,
			marginTop: 25,
			marginBottom: 25
		},
		links: {
		        paddingHorizontal: 10,
		        paddingVertical: 2,
			fontSize: 16,
			color: '#E0FFFF'
		}
	});

//*AppRegistry.registerComponent('TelaPrincipal', () => TelaPrincipal);*//