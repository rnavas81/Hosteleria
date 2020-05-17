import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { globalStyle } from '../styles';
import {getColors as colors} from '../styles/colors';

export default class CategoriesScreen extends Component {
static navigationOptions = ({navigation}) => ({
    title: "Categorias",
})
  constructor(props) {
    super(props);
    this.state = {
        data:props.navigation
    };
  }

  render() {
    const {data,loading} = this.state;
    return (
        <SafeAreaView style={globalStyle.container,styles.container}>
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
    loading: {
        flex: 1,
    },

    })