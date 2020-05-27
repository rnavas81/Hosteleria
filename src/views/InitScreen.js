/**
 * npm install react-native-progress --save
 */
import React, { Component } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getServerBussinesTypes,getBussinesTypes,saveBussinesTypes } from '../redux/reducers/bussinesTypesReducers';

import {getServerBussinesTypeData} from '../data/bussinesTypeData';
import image from '../../assets/splash.png';
import {globalStyle} from '../styles/';
import {getColors as colors } from '../styles/colors';

const mapStateToProps = state => {
  return {
    bussinesTypes:state.bussinesTypes,
    templates:state.templates,
    data:state.data,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getServerBussinesTypes,
      getBussinesTypes,
      saveBussinesTypes,
    },
    dispatch
  )
}

//Retraso de inicio
const delay = ms => new Promise(res => setTimeout(res,ms));

const carga = [
  {accion:'components',texto:'Cargando componentes...'},
  {accion:'bussinesTypes',texto:'Recuperando datos del sistema(1)...'},
  {accion:'templates',texto:'Recuperando datos del sistema(2)...'},
  {accion:'user',texto:'Recuperando datos del usuario...'},
];
class InitScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      progress:0,
      data:{}
    };
  }
  componentDidMount = async () => {
    await this.cargarSiguiente(0);
  }
  cargarSiguiente = async (i) => {
    if(i<carga.length){
      const text = carga[i].texto;
      const accion = carga[i].accion
      switch(accion){
        case 'components':
          break;
        case 'bussinesTypes':
          this.loadBussinesTypes();
          break;
        case 'templates':
          break;
        case 'user':
          break;
        default:
          break;
      }
      this.setState({
        text:text,
        progress:(1/carga.length)*i
      })
      setTimeout(() => {
        this.cargarSiguiente(i+1);
      }, 1000);
      
    } else if(i==carga.length){
      this.setState({
        progress:(1/carga.length)*i
      })
      setTimeout(() => {
        this.cargarSiguiente(i+1);
      }, 1000);
    } else {
      this.pasarPagina();
    }
  }
  loadBussinesTypes = async () => {
    let data = await this.props.getServerBussinesTypes();
    // Alert.alert(JSON.stringify(data));
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
          <Progress.Bar progress={this.state.progress} width={300} color={colors.primary}/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitScreen);
