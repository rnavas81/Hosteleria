/**
 * Pantalla de autenticación
 * 
 * Requiere:
 *  - expo-google-app-auth    expo install expo-google-app-auth
 */
import React, { Component } from 'react';
import { 
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { globalStyle,authentication } from '../styles';
import {Button} from '../components'
import GoogleLogo from '../../assets/google.png';
import FacebookLogo from '../../assets/facebook.png';

const labels = {
  signInWithFacebook:'Accede con Facebook',
  signInWithGoogle:'Accede con Google',
}
export default class AuthScreen extends Component {
  
  state = { user: null };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  signInWithGoogle = async () => {
    Alert.alert("Conectar con...","Intentando conectar con Google");
    this.props.navigation.navigate('Register',{
      data:
        {
          id: null,
          personal: {
              name:'Google test',
              type:2,
              address:'Calle google',
              phone:'000-000-000',
              timetable:'',
              logo:null,
              local:null,
          },
          categories:[]
      }
    })
    // try {
    //   const result = await Google.logInAsync({
    //     iosClientId: IOS_CLIENT_ID,
    //     androidClientId: ANDROID_CLIENT_ID,
    //     scopes: ["profile", "email"]
    //   });

    //   if (result.type === "success") {
    //     console.log("LoginScreen.js.js 21 | ", result.user.givenName);
    //     this.props.navigation.navigate("Profile", {
    //       username: result.user.givenName
    //     }); //after Google login redirect to Profile
    //     return result.accessToken;
    //   } else {
    //     return { cancelled: true };
    //   }
    // } catch (e) {
    //   console.log('LoginScreen.js.js 30 | Error with login', e);
    //   return { error: true };
    // }
  };
  signInWithFacebook = async () => {
    Alert.alert("Conectar con...","Intentando conectar con Facebook");
    this.props.navigation.navigate('Register',{
      data:
        {
          id: null,
          personal: {
              name:'Facebook test',
              type:3,
              address:'Calle Facebook numero 1',
              phone:'000-000-000',
              timetable:'',
              logo:null,
              local:null,
          },
          categories:[]
      }
    })

  }

  render() {
    return (
      <View style={globalStyle.container,authentication.container}>
        <View style={[authentication.box,authentication.textBox]}>
          <Text style={authentication.title}>Menú digital</Text>
        </View>
        <Button onPress={this.signInWithGoogle} style={{width:'80%',marginTop: '10%',}} text={labels.signInWithGoogle} image={GoogleLogo} />
        <Button onPress={this.signInWithFacebook} style={{width:'80%',marginTop: '10%',}} text={labels.signInWithFacebook} image={FacebookLogo} />
      </View>
    );
  }
}