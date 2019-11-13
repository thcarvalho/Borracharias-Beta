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
					<View>
						<View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={styles.texto}>{this.state.user}</Text>
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	texto: {
		fontSize: 30,
		alignItems: 'center',
		fontWeight: 'bold',
		paddingTop: 4,
		paddingBottom: 10,
		color: '#dcdcdc',
	},
});