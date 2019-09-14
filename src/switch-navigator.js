import React, { Component } from 'react';

import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Stack from './stack-navigator';
import Login from './components/login';
import Principal from './drawer-navigation';

export default createAppContainer(
    createSwitchNavigator(
        {
            Login,
            Stack,
            Principal,
        },
        {
            initialRouteName: 'Login',
        }
    )
)
