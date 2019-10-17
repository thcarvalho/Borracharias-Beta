/* eslint-disable prettier/prettier */

import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { SafeAreaView, DrawerItems } from "react-navigation";
import { TouchableOpacity } from 'react-native-gesture-handler';

import Firebase from "../controller/Firebase";

export default class Avatares extends Component {
	state = {
		user: '',
	}
	Firebase = new Firebase()
	componentDidMount() {
		this.Firebase.refUsuarios
			.where('email', '==', this.Firebase.auth.currentUser.email)
			.onSnapshot(snapshot => {
				snapshot.forEach(doc => {
					this.setState({ user: doc.data().nome });
				})
			})
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }} forceInset={{ top: "always", horizontal: "never" }}>
				<View style={styles.container}>
					<View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
						<Image style={styles.imagem} source={require('./assest/avatar-perfil.png')} />
						<TouchableOpacity>
							<Text style={styles.texto}>{this.state.user}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: '#00695c',
	},
	texto: {
		fontSize: 25,
		alignItems: 'center',
		fontWeight: 'bold',
		paddingTop: 10,
		color: '#00695c',
	},
	imagem: {
		marginTop: 60,
		width: 100,
		height: 100,
		borderRadius: 45,
		alignItems: 'center',
		paddingLeft: 10,
	},
});