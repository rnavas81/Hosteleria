/**
 * npm install react-native-progress --save
 */
import React, { Component } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image} from 'react-native';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  addBussinesTypes,
  getServerBussinesTypes,
} from '../redux/reducers/bussinesTypesReducers';

import {
  addTemplates,
  getServerTemplates,
} from '../redux/reducers/templatesReducers';

import {
  addUserdata,
  getServerUserData,
} from '../redux/reducers/userDataReducers';

import {
  addPermission
} from '../redux/reducers/permissionsReducer';

import  * as Permissions from 'expo-permissions';
import image from '../../assets/splash.png';
import {getColors as colors } from '../styles/colors';


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
          //Permisos para acceder a las imagenes del terminal
          const { status: cameraStatus } = await Permissions.getAsync(
            Permissions.CAMERA_ROLL
          );
          this.props.addPermission(Permissions.CAMERA_ROLL,cameraStatus === "granted");
          // this.setState({
          //   loading: false,
          //   hasCameraPermission: cameraStatus === "granted",
          // })

          break;
        case 'bussinesTypes':
          const datatypes = await getServerBussinesTypes();
          this.props.addBussinesTypes(datatypes);
          break;
        case 'templates':
          const datatemplates = await getServerTemplates();
          this.props.addTemplates(datatemplates);
          break;
        case 'user':
          const datauser = await getServerUserData();
          this.props.addUserdata(datauser);
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
  pasarPagina = () =>{
		this.props.navigation.navigate('Login');
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
const mapStateToProps = state => {
  return {
    bussinesTypes:state.bussinesTypes,
    templates:state.templates,
    permissions:state.permissions,
    userdata:state.userdata,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addBussinesTypes,
      addTemplates,
      addUserdata,
      addPermission,
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InitScreen);
