/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Cadastro from "../components/CadastrarUsuario";
import EsqueceuSenha from "../components/esqueceuSenha";
import Login from '../components/login';
import Perfil from '../components/editarPerfil';

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
                headerStyle: styles.header,
                headerTintColor: "#fff",
            })
        },
        EsqueceuSenha:{
            screen: EsqueceuSenha,
            navigationOptions: () =>({
                title: 'Esqueceu a senha?',
                headerStyle: styles.header,
                headerTintColor: "#fff",
            })
        },
        Perfil:{
            screen: Perfil,
        }
        
    }
);

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00695c",
        justifyContent: 'center',
    },
})
  
export default createAppContainer(mainNavigation);
