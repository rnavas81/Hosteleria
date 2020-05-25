/**
 * Requiere instalación de react-native-community/picker
 * npm install @react-native-community/picker --save
 * Requiere react-native-vector-icons
 */
import React, { Component } from 'react';
import { 
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TextInput,
	Alert,
	ActivityIndicator
} from 'react-native';
import { globalStyle } from '../styles';
import {getColors as colors} from '../styles/colors';
import { Button } from '../components';
import {Picker} from '@react-native-community/picker';
import {saveData} from '../data/businnesData';
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
export default class RegisterScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading:true,
			data:props.route.params.data
		};
	};
	componentDidMount = async ()=> {
		this.setState({
		loading: false
		})
	}
	continue = async() => {
		if(this.validate()){
		await saveData(this.state.data);
		this.props.navigation.navigate('Categories',{
			data:this.state.data
		});
		}
	};
	validate = ()=>{
		let errors="";
		let data = this.state.data;
		if(data.personal.name.trim()=="")errors+= "Nombre vacío";
		errors!="" && Alert.alert("Errores",errors);
		return errors=="";
	}
	handleChange = (key,text) => {
		let data = this.state.data;
		data.personal[key]=text;
		this.setState({data:data});
	}
	fotoLogo = () => {
		this.cargarFoto();
	}
	fotoLocal = () => {
		this.cargarFoto();
	}
	cargarFoto = () => {
		Alert.alert("Cargar imagen...");
	}
  render() {
	const {data,loading} = this.state;
	return (
	  <SafeAreaView style={globalStyle.container,styles.container}>
		{loading && 
		  <ActivityIndicator style={globalStyle.loading} size="large" color={colors.accent} />}
		{!loading &&
		  <View>
			<Text style={styles.title}>{labels.title}</Text>
			<View style={styles.itemContent}>
			  <View style={styles.items}>
				<Text style={styles.label} >{labels.name}</Text>
				<TextInput style={styles.item} placeholder={labels.namePlaceholder} 
				  value={data.personal.name}
				  onChangeText={text => this.handleChange('name',text)}/>
			  </View>
			</View>
			<View style={styles.itemContent}>
			  <View style={styles.items}>
				<Text style={styles.label} >{labels.busines}</Text>
				<Picker style={{}} placeholder={labels.businesPlaceholder}
				  selectedValue={data.personal.type}
				  onValueChange={itemValue=>this.handleChange('type',itemValue)}>
				  <Picker.Item value={1} label="Bar"/>
				  <Picker.Item value={2} label="Restaurante"/>
				  <Picker.Item value={3} label="Cafetería"/>
				</Picker>
			  </View>
			</View>
			<View style={styles.itemContent}>
			  <View style={styles.items}>
				<Text style={styles.label} >{labels.address}</Text>
				<TextInput key='address' style={styles.item} 
				  value={data.personal.address}
				  onChangeText={text => this.handleChange('address',text)}/>
			  </View>
			</View>
			<View style={styles.itemContent}>
			  <View style={styles.items}>
				<Text style={styles.label} >{labels.telephone}</Text>
				<TextInput key='phone' style={styles.item} 
				  value={data.personal.phone}
				  onChangeText={text => this.handleChange('phone',text)}/>
			  </View>
			</View>
			<View style={styles.itemContent}>
			  <View style={styles.items}>
				<Text style={styles.label} >{labels.timetable}</Text>
				<TextInput key='timetable' style={styles.item} 
				  value={data.personal.timetable}
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
		  </View>
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