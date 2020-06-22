/**
 * 
 * npm install @react-native-community/picker --save
 * npm install react-native-vector-icons --save
 * npm install expo-permissions --save
 * npm install expo-image-picker --save
 */
import React, { Component } from 'react';
import { 
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TextInput,
	Alert,
	ActivityIndicator,
	KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as Permissions from 'expo-permissions';
import  * as ImagePicker from 'expo-image-picker';
import { globalStyle } from '../styles';
import {getColors as colors} from '../styles/colors';
import { Button } from '../components';
import {Picker} from '@react-native-community/picker';

import { 
	getBussinesTypes,
} from '../redux/reducers/bussinesTypesReducers';
import {
	getTemplates
} from '../redux/reducers/templatesReducers';
import {
	saveUserData,
	addUserdata,
	getStoredUserData
} from '../redux/reducers/userDataReducers';


const labels = {
	title:"Por favor, indica la información del local para ofrecerte el mejor servicio posible",
	name:"Nombre del bar/restaurante",
	namePlaceholder:"Indique el nombre",
	busines:"Tipo de negocio",
	businesPlaceholder:"Seleccione una opción",
	address:"Dirección completa",
	telephone:"Teléfono de atención al cliente",
	timetable:"Horario de apertura",
	btnLogo:"Subir logotipo (opcional)",
	btnLocal:"Subir fotografía del local (opcional)",
	btnContinue:"Continuar",
}
//Retraso de inicio
const delay = ms => new Promise(res => setTimeout(res,ms));
class RegisterScreen extends Component {
	constructor(props) {
		super(props);
		const userdata = this.props.userdata;
		this.state = {
			loading:true,
			userdata:userdata
		};
	};
	componentDidMount = async ()=> {
		// const { status: cameraStatus } = await Permissions.getAsync(
		// 	Permissions.CAMERA_ROLL
		// );
		this.setState({
			loading: false,
		})
	}
	continue = async() => {
		if(this.validate()){
			this.props.addUserdata(this.state.userdata);
			const salvado = await saveUserData(this.state.userdata);
			if(salvado){
				this.props.navigation.navigate('Categories');
			}
		}
	};
	validate = ()=>{
		let errors="";
		if(this.state.userdata.personal.name.trim()=="")errors+= "El nombre no puede estar vacío";
		if(errors!="") Alert.alert("Errores",errors);
		return errors=="";
	}
	handleChange = (key,value) => {
		let data = this.state.userdata;
		data.personal[key]=value;
		this.setState({userdata:data});
	}
	fotoLogo = async () => {
		let imagen = await this.cargarFoto();
		if(imagen!=null){
			this.handleChange('logo',imagen);
		}
	}
	fotoLocal = async () => {
		let imagen = await this.cargarFoto();
		if(imagen!=null){
			this.handleChange('local',imagen);
		}
	}
	cargarFoto = async () => {
		try {
			const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if(status==="granted"){
				let result = await ImagePicker.launchImageLibraryAsync({
						allowsEditing: true,
						aspect: [1, 1]
				});
				if(!result.cancelled){
					return result.uri;
				}
			}
		} catch (error) {
			return null;
		}
	}
  render() {
		const {userdata,loading} = this.state;
		const {bussinesTypes} = this.props;
		return (
			<SafeAreaView style={globalStyle.container,styles.container}>
			{loading && 
				<ActivityIndicator style={globalStyle.loading} size="large" color={colors.accent} />}
			{!loading &&
				<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : null}
				>
					<Text style={styles.title}>{labels.title}</Text>
					<View style={styles.itemContent}>
						<View style={styles.items}>
						<Text style={styles.label} >{labels.name}</Text>
						<TextInput style={styles.item} placeholder={labels.namePlaceholder} 
							value={userdata.personal.name}
							onChangeText={text => this.handleChange('name',text)}/>
						</View>
					</View>
					<View style={styles.itemContent}>
						<View style={styles.items}>
						<Text style={styles.label} >{labels.busines}</Text>
						<Picker style={{}} placeholder={labels.businesPlaceholder}
							selectedValue={userdata.personal.type}
							onValueChange={itemValue=>this.handleChange('type',itemValue)}>{
								bussinesTypes.map(item => <Picker.Item key={item.id} value={item.id} label={item.name}/> )
							}
						</Picker>
						</View>
					</View>
					<View style={styles.itemContent}>
						<View style={styles.items}>
						<Text style={styles.label} >{labels.address}</Text>
						<TextInput key='address' style={styles.item} 
							value={userdata.personal.address}
							onChangeText={text => this.handleChange('address',text)}/>
						</View>
					</View>
					<View style={styles.itemContent}>
						<View style={styles.items}>
						<Text style={styles.label} >{labels.telephone}</Text>
						<TextInput key='phone' style={styles.item} 
							value={userdata.personal.phone}
							onChangeText={text => this.handleChange('phone',text)}/>
						</View>
					</View>
					<View style={styles.itemContent}>
						<View style={styles.items}>
						<Text style={styles.label} >{labels.timetable}</Text>
						<TextInput key='timetable' style={styles.item} 
							value={userdata.personal.timetable}
							onChangeText={text => this.handleChange('timetable',text)}/>
						</View>
					</View>
					<View style={[styles.itemContent,styles.itemContent2]}>
						<View style={styles.items}>
						<Button text={labels.btnLogo} icon='camera-outline' type='small' onPress={this.fotoLogo}/>
						</View>
					</View>
					<View style={[styles.itemContent,styles.itemContent2]}>
						<View style={styles.items}>
						<Button text={labels.btnLocal} icon='camera-outline' type='small' onPress={this.fotoLocal}/>
						</View>
					</View>
					<View style={[styles.itemContent,styles.itemContent2]}>
						<View style={[styles.items,{alignItems:'flex-end'}]}>
						<Button text={labels.btnContinue} style={{width: '50%'}} onPress={this.continue}/>
						</View>
					</View>
				</KeyboardAvoidingView>
			}
			</SafeAreaView>
		);
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: 'flex-start',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		backgroundColor: colors.background
	},
	title:{
		fontSize: 16,
		color: colors.text,
		marginBottom: 10,
	},
	itemContent:{
		// flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
	},
	itemContent2:{
		marginBottom: 5,
		justifyContent:'flex-end'
	},
	items: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		marginBottom: 15,
		// borderWidth: 1,
	},
	item:{
		backgroundColor: colors.background2,
		paddingLeft:5 ,
	},
	label: {
		fontSize: 13,
		marginLeft: 10,
	},
})


const mapStateToProps = state => {
  return {
    bussinesTypes:state.bussinesTypes,
    templates:state.templates,
    userdata:state.userdata,
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
			getBussinesTypes,
			getTemplates,
			addUserdata
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);