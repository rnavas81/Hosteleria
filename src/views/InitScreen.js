/**
 * npm install react-native-progress --save
 */
import React, { Component } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import image from '../../assets/splash.png';
import {globalStyle} from '../styles/';
import * as Progress from 'react-native-progress';

const textos = [
  'Cargando componentes...',
  'Recuperando datos del sistema...',
  'Recuperando datos del usuario...',
]

export default class InitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:textos[0],
      progress:0,
      data:{}
    };
  }
  componentDidMount = () => {
    let i=0;
    let interval = setInterval(() => {
      if(i<textos.length) {
        let texto = textos[i];
        this.setState({
          text:textos[i],
          progress:(1/textos.length)*i
        })
      } else if(i==textos.length) {
        this.setState({progress:1})
      } else {
        clearInterval(interval);
        this.pasarPagina();
      }
      i++;
    }, 1000);
  }
  pasarPagina = () =>{
		this.props.navigation.navigate('Login',{
			data:this.state.data
		});
  }
  render() {
    return (
      <SafeAreaView style={[styles.container,{flexDirection: 'row',}]}>
        <View style={[styles.container,{flexDirection: 'column',}]}>
          <Image style={styles.image} source={image} />

          <Text > {this.state.text} </Text>
          <Progress.Bar progress={this.state.progress} width={300} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',

  },
  image: {
    width: 300,
    height: 300
  }
});
