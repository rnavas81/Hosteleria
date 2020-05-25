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
import {CategoryList,CategoryModal,FAB} from '../components';
import {getEmptyData,saveData,getData} from '../data/businnesData';


const labels = {
    title:'Indica las categorías en las que quieres presentar los productos de tu carta',
    deleteProductTitle:'Eliminar producto',
    deleteProduct:'¿Quiere eliminar este producto?',
    deleteMenuTitle:'Eliminar menú',
    deleteMenu:'¿Quiere eliminar este menú?',
}

export default class CategoriesScreen extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            loading:true,
            addModalVisible:false,
            type:false,
            data:{},
            category:{}
        };
    }
    componentDidMount = async () => {
        // let data = await getData();
        await setTimeout(() => {
            let data = this.props.route.params.data;
            data.categories=dataDummies;
            this.setState({data:data});
            this.setState({loading:false});
            
        }, 1000);        
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
    handlerUpdate = category => {
        this.setState({type:'update',category:category});
        this.toogleModal();

    }
    handlerAdd = () => {
        let newData = getEmptyData();
        this.setState({type:'insert',category:newData});
        this.toogleModal();
    }
    updateCategories = category => {
        if(this.state.type=='insert'){

        }
        this.setState({type:null,category:null});
        this.toogleModal();
    }

	toogleModal = () => {
		this.setState({addModalVisible: !this.state.addModalVisible})
	}

    render() {
        const {data,loading,addModalVisible,type,category} = this.state;
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
                    <>
                    <CategoryList 
                        categories={data.categories}
                        onDelete={this.handlerDelete}
                        onEdit={this.handlerUpdate}
                        />
                    <FAB 
                        text="+"
                        fabStyle={{backgroundColor: colors.primary}}
                        textStyle={{color: colors.primaryTextContrast}}
                        onPress={this.handlerAdd}
                    />
                    <CategoryModal 
                        visible={addModalVisible}
                        type = {type}
                        onCloseModal={this.toogleModal}
                        onCategoryModal={this.handlerUpdate}
                        name={category.name}
                        description={category.description}
                        type={category.type}
                        image={category.image}
                        />
                    </>
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
const dataDummies=[
    {
        id:1,
        name:"Entrantes",
        description:"",
        image:null,
        type:1
    },
    {
        id:2,
        name:"Primeros",
        description:"",
        image:null,
        type:1
    },
    {
        id:3,
        name:"Segundos",
        description:"",
        image:null,
        type:1
    },
    {
        id:4,
        name:"Postres",
        description:"",
        image:null,
        type:1
    },
    {
        id:5,
        name:"Bebidas",
        description:"",
        image:null,
        type:1
    },
    {
        id:6,
        name:"Menú del día",
        description:"",
        image:null,
        type:2
    },
    {
        id:7,
        name:"Menú degustación",
        description:"",
        image:null,
        type:2
    }
];