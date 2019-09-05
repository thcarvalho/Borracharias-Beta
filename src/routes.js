import React, { Component } from 'react';

import { View, SafeAreaView, ScrollView, Dimensions } from 'react-native';

import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomNavigation from "./bottom-navigation";
import Settings from "./components/settings";

const drawerNavigation = createDrawerNavigator(
    {
        Principal: {
            screen: BottomNavigation,
            navigationOptions: ({focused}) => ({
                drawerIcon: <Icon name="home" size={20} color={focused ? "#fff" : "#000"} />,
            }),
        },
        Configurações: {
            screen: Settings,
            navigationOptions: ({focused}) => ({
                drawerIcon: <Icon name="cog" size={20} color={focused ? "#fff" : "#000"} />,
            }),
        },
    },
    {
        overlayColor: 'rgba(0,0,0,0.4)',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#51b890',
        },
    }
    )

export default createAppContainer(drawerNavigation);