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
import Sugerir from "./components/sugerir";

const drawerNavigation = createDrawerNavigator(
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
            screen: Adicionar,
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
            activeBackgroundColor: '#51b890',
        },
    },
);

export default createAppContainer(drawerNavigation);
