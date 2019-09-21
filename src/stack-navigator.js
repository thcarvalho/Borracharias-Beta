import React, { Component } from 'react';

import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Cadastro from "./components/CadastrarUsuario";
import Switch from "./switch-navigator";
import Login from './components/login';
import EsqueceuSenha from "./components/esqueceuSenha";

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
        EsqueceuSenha:{
            screen: EsqueceuSenha,
            navigationOptions: () =>({
                title: 'Esqueceu a senha?',
            })
        }
    }
);
  
export default createAppContainer(mainNavigation);
