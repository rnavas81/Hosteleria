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
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { globalStyle } from '../styles';
// import * as GoogleSignIn from 'expo-google-sign-in';
// import GoogleLogo from 'Hosteleria/assets/google.png';
import GoogleLogo from '../../assets/google.png';
import FacebookLogo from '../../assets/facebook.png';


export default class AuthScreen extends Component {
	static navigationOptions = {
		title: "Acceso"
  }
  
  state = { user: null };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  signInWithGoogle = async () => {
    Alert.alert("Conectar con...","Intentando conectar con Google");
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

  }

  render() {
    return (
      <View style={globalStyle.container,styles.container}>
        <View style={[styles.box,styles.textBox]}>
          <Text style={styles.title}>Menú digital</Text>
        </View>
        <TouchableOpacity style={[styles.box,styles.buttonBox]} onPress={this.signInWithGoogle}>
            <Image style={styles.icon} source={GoogleLogo} />
            <Text style={styles.textButton}>Acceder con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.box,styles.buttonBox]} onPress={this.signInWithFacebook}>
            <Image style={styles.icon} source={FacebookLogo} />
            <Text style={styles.textButton}>Acceder con Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  box: {
    width: '80%',
    textAlign: "center",
    marginTop: '10%',
  },
  textBox: {
    marginTop: '20%',
    marginBottom: '10%',
    alignItems: "center",
    
  },
  title:{
    fontSize: 50,
    fontWeight: 'bold',
    color: '#F49F2F',  
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5
  },
  buttonBox: {
    borderColor: 'orange',
    borderWidth: 1,
    backgroundColor: '#052C45',
    padding: 10,
    flexDirection: 'row',
  },
  icon: {
      width: 30,
      height: 30
  },
  textButton: {
    flex: 1,
    height: 30,
    marginLeft: 15,
    fontSize: 20,
    color: '#FFF'
    // borderWidth: 1,
  }
})
