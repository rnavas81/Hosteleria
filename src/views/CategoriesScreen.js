import React, { Component } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { globalStyle } from '../styles';
import {getColors as colors} from '../styles/colors';
import {CategoryList} from '../components';
import {newData,saveData,getData} from '../data/businnesData';


const labels = {
    title:'Indica las categorías en las que quieres presentar los productos de tu carta',
    deleteProductTitle:'Eliminar producto',
    deleteProduct:'¿Quiere eliminar este producto?',
    deleteMenuTitle:'Eliminar menú',
    deleteMenu:'¿Quiere eliminar este menú?',
}

export default class CategoriesScreen extends Component {
static navigationOptions = ({navigation}) => ({
    title: "Categorias",
})
    constructor(props) {
        super(props); 
        let data = props.navigation.getParam("data")
        this.state = {
            loading:true,
            data:data,
        };
    }
    componentDidMount = async () => {
        let data = await getData();
        this.setState({data:data,loading:false});
        
    }
    handlerUpdate = () => {

    }
    handlerDelete = category => {
		Alert.alert(
            category.type==1?labels.deleteProductTitle:labels.deleteProductTitle,
            category.type==1?labels.deleteProduct:labels.deleteProduct,
			[
				{text:"Cancelar"},
				{text:"Aceptar", onPress:()=>{
					const data = this.state.data;
                    const categories = data.categories.filter(c => c.id!==category.id);
                    data.categories=categories;
					this.setState({data:data});
				}}
			]
		)

    }
    handlerEdit = category => {
    }

  render() {
    const {data,loading} = this.state;
    let dataList = [];
    if(!loading){
        dataList=data.categories;
    }

    // const dataList = data.categories;
    return (
        <SafeAreaView style={globalStyle.container,styles.container}>
			<Text style={styles.title}>{labels.title}</Text>
            {loading && 
                <ActivityIndicator style={globalStyle.loading} size="large" color={colors.accent} />
            }
            {!loading && 
            <CategoryList 
                categories={data.categories}
                onUpdate={this.handlerUpdate}
                onDelete={this.handlerDelete}
                onEdit={this.handlerEdit}
                />
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