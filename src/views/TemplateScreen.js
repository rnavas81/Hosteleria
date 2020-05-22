import React, { Component } from 'react';
import { 
	SafeAreaView,
	View,
	Text,
	StyleSheet,
    Image,
    Alert,
} from 'react-native';
/**import {Flecha} from '../../assets/flecha.png';
import {Sora} from '../../assets/imagenes_prueba/sora.jpg';
import {Cruz} from '../../assets/imagenes_prueba/cruz.png';*/
import {Button} from '../components';

export default class TemplateScreen extends Component{

    constructor(props){
        super(props);
        this.state = { 
            uri: require('../../assets/imagenes_prueba/sora.jpg') 
        }
    };
    previousTemplate = async () => {
        this.setState({
            uri: require('../../assets/imagenes_prueba/gif.gif')
        });
    }

    nextTemplate = async () => {
        this.setState({
            uri: require('../../assets/imagenes_prueba/cruz.png')
        });
    }

    templateSelected = async () => {
        Alert.alert("Enhorabuena!!!", "Es usted nuestro usuario nº 1000 y por eso ha ganado un iPhone XR");
    };

    render(){
        return(
            <SafeAreaView>
                <Text style={styles.baseText}>Selecciona como quieres que tus clientes vean el menú (varios modelos disponibles).</Text>
                <View style={styles.view}>
                    <Button onPress={this.previousTemplate} style={styles.buttonLeft}></Button>
                    <Image style={styles.template} source={this.state.uri}></Image>
                    <Button onPress={this.nextTemplate} style={styles.buttonRight}></Button>
                </View>
                <Button onPress={this.templateSelected} style={styles.buttonFinish} text="Finalizar"></Button>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 16,
        margin: 10
    },
    buttonLeft: {
        width: '13%',
        height: '12%',
        borderRadius: 100,
        marginLeft: '1.4%',
        marginTop: '50%'
    },
    buttonRight: {
        width: '13%',
        height: '12%',
        borderRadius: 100,
        marginLeft: '1.5%',
        marginTop: '50%'
    },
    buttonFinish: {
        width: 200,
        height: 50,
        marginTop: '4%',
        marginLeft: 192
    },
    view: {
        marginTop: '2%',
        flexDirection: 'row'
    },
    template: {
        width: '68%',
        height: 450,
        marginLeft: '1.7%',
        resizeMode: 'cover',
    }
})
//Ojo aqui (sustituto linea 46) <Button onPress={this.nextTemplate} style={styles.buttonRight} image={Flecha}></Button>