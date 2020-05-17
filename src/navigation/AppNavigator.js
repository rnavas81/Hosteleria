/**
 * Se deben incluir las librerias:
 *  - react-navigation              npm install --save react-navigation
 *  - react-native-gesture-handler  npm install --save react-native-gesture-handler
 *  - react-navigation-stack        npm install --save react-navigation-stack
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { AuthScreen,ProfileScreen,RegisterScreen,CategoriesScreen } from '../views';
import {getColors as colors} from '../styles/colors';
import { Alert,TouchableOpacity,Text } from 'react-native';

export default createAppContainer(
    createStackNavigator(
        {//Pantalla a usar
            Login       : {screen: AuthScreen},
            Profile     : {screen: ProfileScreen},
            Register    : {screen: RegisterScreen},
            Categories  : {screen: CategoriesScreen},
        },
        {//Propiedades del stack
            initialRouteName: "Categories",
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTinColor: colors.primaryTextContrast,
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: colors.primaryTextContrast
                },
            },
        }
    )
)