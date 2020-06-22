/**
 * Pantalla de autenticación
 * 
 * Requiere:
 *  - expo install expo-google-app-auth
 *  - expo install expo-facebook
 */
import React, { Component } from 'react';
import { 
  View,
  Text,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { globalStyle,authentication } from '../styles';
import {Button} from '../components'
import GoogleLogo from '../../assets/google.png';
import FacebookLogo from '../../assets/facebook.png';
import {getColors as colors} from '../styles/colors';
import {
  addUserdata
} from '../redux/reducers/userDataReducers';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

const labels = {
  signInWithFacebook:'Accede con Facebook',
  signInWithGoogle:'Accede con Google',
}
const ANDROID_CLIENT_ID = '856847519460-rr6n33onlmpe6g7jfgt3qglckerfok56.apps.googleusercontent.com';
const IOS_CLIENT_ID = 'IOS_CLIENT_ID';
const FACEBOOK_APP_ID = '878719352630898';

class AuthScreen extends Component {
  
  state = { user: null };

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      type:null
    };
  }
  componentDidMount = async () => {
    Facebook.initializeAsync(FACEBOOK_APP_ID,'Hosteleria');

    if (this.state.type === 'success') {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      console.log(user);
    } else {
      this.setState({loading:false});
    }
  }

  signInWithGoogle = async () => {
    ToastAndroid.show("Intentando conectar con Google",1000);    
    try {
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        console.log("LoginScreen.js.js 21 | ", result.user.givenName);
        const {userdata} = this.props;
        console.log(result.user,userdata);
        userdata.personal
        // this.setUserData(data);
        // this.siguiente();
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log('LoginScreen.js.js 30 | Error with login', e);
      return { error: true };
    }
  };
  signInWithFacebook = async () => {
    ToastAndroid.show("Intentando conectar con Facebook",3000);
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
          this.siguiente();
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
  siguiente = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Register');      
    }, 3000);
  }
  render() {
    const {loading}=this.state;
    return (
      <View style={globalStyle.container,authentication.container}>
        {loading && 
          <ActivityIndicator style={authentication.loading} size="large" color={colors.accent} />
        }
        {!loading && 
        <>
          <View style={[authentication.box,authentication.textBox]}>
            <Text style={authentication.title}>Menú digital</Text>
          </View>
          <Button onPress={this.signInWithGoogle} style={{width:'80%',marginTop: '10%',}} text={labels.signInWithGoogle} image={GoogleLogo} />
          <Button onPress={this.signInWithFacebook} style={{width:'80%',marginTop: '10%',}} text={labels.signInWithFacebook} image={FacebookLogo} />
        </>
        }
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    userdata:state.userdata,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addUserdata
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
