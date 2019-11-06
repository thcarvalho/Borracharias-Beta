/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, ScrollView } from 'react-native';
import {
    createDrawerNavigator,
    createAppContainer,
    SafeAreaView,
    DrawerItems,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomNavigation from './bottom-navigation';
import CadastrarDestinacao from "../components/CadastrarDestinacao";
import Sugerir from "../components/SugerirDestinacao";
import Logout from "../components/logout";
import Avatares from "../components/avatar";
import Perfil from '../components/editarPerfil';

const DrawerContent = props => (
    <SafeAreaView style={{flex: 1 }}>

        <SafeAreaView style={{flex: 1, backgroundColor: '#00695c'}} forceInset={{ top: "always", horizontal: "never" }}>
        <View style={{flex: 1,marginTop: 20, }}>
            <Avatares />
            </View>
        </SafeAreaView>

        <ScrollView style={{marginTop: 50, }}>
            <DrawerItems {...props} />
        </ScrollView>

        <SafeAreaView style={{flex: 1}} forceInset={{ bottom: "always", horizontal: "never" }}>
        <View style={{flex: 1, marginTop: 70, justifyContent: "center"}}>
            <Logout />
        </View>
        </SafeAreaView>
    </SafeAreaView>
);

const DrawerNavigation = createDrawerNavigator(
    {
        Principal: {
            screen: BottomNavigation,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="home" size={20} color={focused ? '#fff' : '#000'} />
                ),
            }),
        },
        Sugerir: {
            screen: Sugerir,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="paper-plane" size={20} color={focused ? '#fff' : '#000'} />
                ),
            }),
        },
        Perfil: {
            screen: Perfil,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="user" size={20} color={focused ? '#fff' : '#000'} />
                ),
            }),
        },
        Adicionar: {
            screen: CadastrarDestinacao,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="plus" size={20} color={focused ? '#fff' : '#000'} />
                ),
            }),
        }
    },
    {
        overlayColor: 'rgba(0,0,0,0.4)',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#009688',
        },
        contentComponent: DrawerContent,
    },
);

export default createAppContainer(DrawerNavigation);