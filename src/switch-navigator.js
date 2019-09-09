import React, { Component } from 'react';

import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Cadastro from './components/cadastro';
import Login from './components/login';
import Principal from './drawer-navigation';

export default createAppContainer(
    createSwitchNavigator(
        {
            Login,
            Cadastro,
            Principal,
        },
        {
            initialRouteName: 'Login',
        }
    )
)
