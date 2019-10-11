/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View } from 'react-native';
import {
    createDrawerNavigator,
    createAppContainer,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomNavigation from './bottom-navigation';
import Settings from '../components/settings';
import CadastrarDestinacao from "../components/CadastrarDestinacao";
import Sugerir from "../components/SugerirDestinacao";
import Logout from "../components/logout";

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
        Configurações: {
            screen: Settings,
            navigationOptions: ({ focused }) => ({
                drawerIcon: (
                    <Icon name="cog" size={20} color={focused ? '#fff' : '#000'} />
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
        contentComponent: Logout,
    },
);
export default createAppContainer(DrawerNavigation);
