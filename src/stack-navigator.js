import React, { Component } from 'react';

import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Cadastro from "./components/cadastro";
import Switch from "./switch-navigator";
import Login from './components/login';

const mainNavigation = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: () =>({
                headerTransparent: true,
            })
        },
        Cadastro:{
            screen: Cadastro,
            navigationOptions: () =>({
                title: 'Cadastro',
            })
        }
    }
);
  
export default createAppContainer(mainNavigation);