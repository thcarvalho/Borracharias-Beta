import React, { Component } from 'react';

import { View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import SwitchNavigator from "./switch-navigator";
import DrawerNavigation from "./drawer-navigation";

const mainNavigation = createSwitchNavigator({
    SwitchNavigator,
    DrawerNavigation,
});

export default createAppContainer(mainNavigation);
