/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View } from 'react-native';
import {
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomNavigation from './bottom-navigation';
import Settings from './components/settings';
import CadastrarDestinacao from "./components/CadastrarDestinacao";
import Sugerir from "./components/SugerirDestinacao";
import firebase from "react-native-firebase";


let auth = firebase.auth();
console.log(auth.currentUser);
var DrawerNavigation = createDrawerNavigator(
    {
        Principal: {
            screen: BottomNavigation,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="home" size={20} color={focused ? '#fff' : '#000'} />
                ),
            }),
        },
        Configurações: {
            screen: Settings,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="cog" size={20} color={focused ? '#fff' : '#000'} />
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
    },
    {
        overlayColor: 'rgba(0,0,0,0.4)',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#009688',
        },
    },
);

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email);
        if (user.email === "admin@email.com") {
            DrawerNavigation = createDrawerNavigator(
                {
                    Principal: {
                        screen: BottomNavigation,
                        navigationOptions: ({ focused }) => ({
                            drawerIcon: (
                                <Icon name="home" size={20} color={focused ? '#fff' : '#000'} />
                            ),
                        }),
                    },
                    Configurações: {
                        screen: Settings,
                        navigationOptions: ({ focused }) => ({
                            drawerIcon: (
                                <Icon name="cog" size={20} color={focused ? '#fff' : '#000'} />
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
                },
            );
        } else {
            DrawerNavigation = createDrawerNavigator(
                {
                    Principal: {
                        screen: BottomNavigation,
                        navigationOptions: ({ focused }) => ({
                            drawerIcon: (
                                <Icon name="home" size={20} color={focused ? '#fff' : '#000'} />
                            ),
                        }),
                    },
                    Configurações: {
                        screen: Settings,
                        navigationOptions: ({ focused }) => ({
                            drawerIcon: (
                                <Icon name="cog" size={20} color={focused ? '#fff' : '#000'} />
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
                },
                {
                    overlayColor: 'rgba(0,0,0,0.4)',
                    contentOptions: {
                        activeTintColor: '#fff',
                        activeBackgroundColor: '#009688',
                    },
                },
            );
        }
    }
})

export default createAppContainer(DrawerNavigation);
