/**
 * Se deben incluir las librerias:
 *  - react-navigation              npm install --save react-navigation
 *  - react-native-gesture-handler  npm install --save react-native-gesture-handler
 *  - react-navigation-stack        npm install --save react-navigation-stack
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { AuthScreen,ProfileScreen } from '../views';

export default createAppContainer(
    createStackNavigator(
        {//Pantalla a usar
            Login: {screen: AuthScreen},
            Profile: {screen: ProfileScreen},
        },
        {//Propiedades del stack
            initialRouteName: "Profile",
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: "#0066FF",
                },
                headerTinColor: "#FFF",
                headerTitleStyle: {
                    fontWeight: "bold",
                    color: "#FFF"
                }
            }
        }
    )
)