import React, { Component } from "react";
import {
	Modal,
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Lightbox,
	Image,
	Alert,
} from "react-native";
import Button from './Button';
import {getColors as colors} from '../styles/colors';
import { Picker } from "@react-native-community/picker";

const initialState = {
	name:'',
	description:'',
	type:1,
	image:null
};
export default class CategoryModal extends Component {
	constructor(props) {
		super(props);
		const { name,description,type,image } = this.props;
		this.state = {
			name:name,
			description:description,
			type:type,
			image:image,
		};
	}

	onUpdateCategory = () => {
		let category = {
			name:this.state.name,
			description:this.state.description,
			type:this.state.type,
			image:this.state.image,
		}
		this.props.onCategoryModal(category);
		// reset initialState for next Add
		this.setState(initialState);
		onCloseModal();
	};
	subirFoto = () => {
		Alert.alert("Abre la galería de imagenes o abre la cámara")		
	}

	handleChange = (key,value)=>{
		let clave = key;
		let valor = value;
		this.setState({clave,valor});
	}

	render() {
		const { visible, onCloseModal } = this.props;
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={onCloseModal}
			>
				<View style={styles.container}>
					<KeyboardAvoidingView
						style={styles.content}
						behavior={Platform.OS === "ios" ? "padding" : ""}
					>
						<View style={styles.block}>
							<Picker 
							style={styles.textInput}
							selectedValue={this.state.type}
							onValueChange={itemValue=>this.handleChange('type',itemValue)}
							>
								<Picker.Item label='Producto' value={1}></Picker.Item>
								<Picker.Item label='Menú' value={2}></Picker.Item>
							</Picker>
						</View>
						<View style={styles.block}>
							<Text style={styles.text}>Nombre de la categoría</Text>
							<TextInput
							style={styles.textInput}
							value={this.state.name}
							onChangeText={text => this.handleChange('name',text)}
							clearButtonMode="always"
							/>
						</View>
						<View style={styles.block}>
							<Text style={styles.text}>Breve descripción</Text>
							<TextInput
							style={[styles.textInput, styles.textArea]}
							value={this.state.description}
							onChangeText={text => this.handleChange('name',text)}
							numberOfLines={4}
							multiline={true}
							clearButtonMode="always"
							/>
						</View>
						<View style={styles.block}>
							<Button text={'Subir fotografía (opcional)'} icon='camera-outline' type='small' onPress={this.subirFoto}/>
						</View>

                        <View style={styles.block}>
                            <View style={styles.imgContainer}>
								{this.state.image &&
									<Lightbox>
										<Image 
											style={styles.img}
											resizeMode="contain"
											source={{uri:this.state.image}}
										/>
									</Lightbox>
								}
                            </View>
                        </View> 
						<View style={styles.buttonRow}>
							<Button text="Cancelar" style={{width: "40%"}} onPress={onCloseModal} />
							<Button text="Guardar" style={{width: "40%"}} onPress={this.onUpdateCategory} />
						</View>
					</KeyboardAvoidingView>
				</View>
			</Modal>
		);
	}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: "center",
      flexDirection: "row",
      backgroundColor: colors.shadowColor,
    },
    content: {
      padding: 20,
      paddingBottom: 30,
      flex: 1,
      backgroundColor: colors.dark,
      shadowOffset: { width: 0, height: -3 },
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 30,
      width: '80%',
    },
    text: {
		color: colors.primaryTextContrast
	},
	textInput: {
		padding: 5,
		backgroundColor: colors.primaryTextContrast
	},
    closeIcon: {
      color: "#fff"
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingBottom: 20
    },
    block: {
      margin: 10
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    blockRow: {
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowContent: {
      flex: 3,
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    imgContainer: {
      height: 200,
      width: 200
    },
    img: {
      height: '100%',
      width: '100%'
    }
  });