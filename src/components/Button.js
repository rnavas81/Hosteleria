import React from 'react';
import { 
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {getColors as colors} from '../styles/colors';


const Button = ({
    text,
    type,
    style,
    styleText,
    styleImg,
    icon,
    image,
    ...otherProps
}) => {
    const basicsStyle = StyleSheet.create({
        container:{
            flexDirection: 'row',            
            padding: 10,
            borderWidth: 1,
            borderRadius: 0,
        },
        textButton: {
            flex: 1,
            height: 30,
            fontSize: 20,
            marginLeft: icon || image ? 15 : 0,
            textAlignVertical:'center',
            color: colors.primaryTextContrast,
    
        },
        icon: {
            marginLeft: 5,
            color: colors.accent
        },
        image: {
            width: 30,
            height: 30
        },
        
    });
    const defaultStyle = StyleSheet.create({
        container:{
            backgroundColor: colors.buton1,
            borderColor: colors.accent,
            minHeight: 50
        },
        textButton: {
            // color: '#FFF',
            textAlign:'center',
    
        },
        icon: {
        },
        image: {
        },
    });
    const smallStyle = StyleSheet.create({
        container:{
            padding: 2,
            backgroundColor: colors.buton2,
            borderRadius: 10,
        },
        textButton: {
            flex: 1,
            marginLeft: 15,
            textAlignVertical:'center',
            color: '#FFF',
    
        },
        icon: {
        },
        image: {
        },
    });
    return (
        <TouchableOpacity 
            style={[basicsStyle.container,type=='small'?smallStyle.container:defaultStyle.container,style]} 
            {...otherProps}>
            {image && 
                <Image style={[basicsStyle.image,type=='small'?smallStyle.image:defaultStyle.image,styleImg]} source={image} />
            }
            {icon && 
                  <Icon style={[basicsStyle.icon,type=='small'?smallStyle.icon:defaultStyle.icon,styleImg]} name={icon} size={25} />
                }
            <Text style={[basicsStyle.textButton,type=='small'?smallStyle.textButton:defaultStyle.textButton,styleText]}>{text}</Text>
        </TouchableOpacity>
    );
}
export default Button;
