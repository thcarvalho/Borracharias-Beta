import React, { Component } from 'react';

import { View } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Artigos from "./components/artigos";
import Maps from "./components/maps";
import Lista from "./components/lista";



const bottomNavigation = createMaterialBottomTabNavigator(
    {
        Artigos: {
            screen: Artigos,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                  <Icon name="clipboard" size={18} color={focused ? '#fff' : '#ddd'} />
                ),
            }),
        },
        Maps: {
            screen: Maps,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                  <Icon name="map-marked" size={18} color={focused ? '#fff' : '#ddd'} />
                ),
            }),
        },
        Lista: {
            screen: Lista,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                  <Icon name="list" size={18} color={focused ? '#fff' : '#ddd'} />
                ),
            }),
        },
    },
    {
        initialRouteName: 'Maps',
        activeColor: '#f0edf6',
        inactiveColor: '#3e2465',
        barStyle: {
            backgroundColor: '#6ec2a0',
        },
    }
);

export default createAppContainer(bottomNavigation);