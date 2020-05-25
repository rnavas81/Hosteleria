/**
 * Se deben incluir las librerias:
 *  - react-navigation              npm install --save react-navigation
 *  - react-native-gesture-handler  npm install --save react-native-gesture-handler
 *  - react-navigation-stack        npm install --save react-navigation-stack
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { 
    InitScreen,
    AuthScreen,
    ProfileScreen,
    RegisterScreen,
    CategoriesScreen,
    SettingsScreen,
    TemplateScreen,
} from '../views';
import {getColors as colors} from '../styles/colors';

const Stack=createStackNavigator();
const Drawer = createDrawerNavigator();
function StackNavigator(params) {
    return (
      <Stack.Navigator
        initialRouteName="Init"
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerBackTitleStyle: {
                color: colors.primaryTextContrast
            },
            headerTinColor: 'white',
            headerTitleStyle: {
                fontWeight: "bold",
                color: colors.primaryTextContrast
            },
        }}
        >
        <Stack.Screen name="Init" component={InitScreen} options={{
            title: "Pantalla inicial",
            header:()=>false
        }}/>
        <Stack.Screen name="Login" component={AuthScreen}  options={{
            title: "Acceso",
            header:()=>false
        }}/>
        <Stack.Screen name="Profile" component={ProfileScreen}  options={{
            title: "Datos del usuario",
        }}/>
        <Stack.Screen name="Register" component={RegisterScreen}  options={{
            title: "Registro",
        }}/>
        <Stack.Screen name="Settings" component={SettingsScreen}  options={{
            title: "Ajsutes",
        }}/>
        <Stack.Screen name="Categories" component={CategoriesScreen}  options={{
            title: "Categorias",
        }}/>
        <Stack.Screen name="Templates" component={TemplateScreen}  options={{
            title: "Categorias",
        }}/>
      </Stack.Navigator>
    );    
}
function MyDrawer() {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      overlayColor="transparent"
    >
      {/* Screens */}
      <Drawer.Screen name="Stack" component={StackNavigator} />
      <Drawer.Screen name="Categories" component={CategoriesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
export default function AppNavigator() {
  return (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  );
}

// function Componente(Nombre) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>{Nombre}</Text>
//       </View>
//     );
//   }
// function MyDrawer() {
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name="CategoriesScreen" component={()=>Componente('Categorias')} />
//         <Drawer.Screen name="SettingsScreen" component={Article} />
//       </Drawer.Navigator>
//     );
//   }
  

// export default createAppContainer(
//     createDrawerNavigator({
//         Categories  : CategoriesScreen,
//         Settings    : SettingsScreen,
//     })
// )