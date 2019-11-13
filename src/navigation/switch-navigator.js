/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Stack from './stack-navigator';
import Login from '../components/login';
import SplashScreen from '../components/splashScreen';

export default createAppContainer(
    createSwitchNavigator(
        {
            SplashScreen,
            Stack,
        },
    )
);
