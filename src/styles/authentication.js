import { StyleSheet } from 'react-native';
import {getColors as colors} from '../styles/colors';

const authentication = StyleSheet.create({
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
      color: colors.accent,  
      textShadowColor: colors.shadowColor,
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5
    }

});

export default authentication;