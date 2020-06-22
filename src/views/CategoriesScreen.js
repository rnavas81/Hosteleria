import React, { Component } from 'react';
import { 
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as Permissions from 'expo-permissions';
import  * as ImagePicker from 'expo-image-picker';
import { globalStyle } from '../styles';
import {getColors as colors} from '../styles/colors';
import {CategoryList,CategoryModal,FAB,Button} from '../components';
import {
  addUserdataCategory,
  updateUserdataCategory,
  deleteUserdataCategory,
  newUserDataCategory
} from '../redux/reducers/userDataReducers';
import {getEmptyData,saveData,getData} from '../data/businnesData';


const labels = {
    title:'Indica las categorías en las que quieres presentar los productos de tu carta',
    deleteProductTitle:'Eliminar producto',
    deleteProduct:'¿Quiere eliminar este producto?',
    deleteMenuTitle:'Eliminar menú',
    deleteMenu:'¿Quiere eliminar este menú?',
    guardar:'Guardar'
}

class CategoriesScreen extends Component {
  constructor(props) {
      super(props); 
      const data = this.props.userdata;
      if(data.categories.length==0){
        data.categories=dataDummies;
      }
      this.state = {
          loading:true,
          addModalVisible:false,
          handleModal:()=>{},
          categories:[...data.categories],
          category:newUserDataCategory()
      };
  }
  componentDidMount = async () => {
    setTimeout(() => {
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
                  const categories = this.state.categories.filter(c => c.id!==category.id);
                  this.setState({
                    categories:categories,
                    category:null
                  });
              }}
          ]
      )

  }
  handlerUpdate = category => {
    console.log(category);
    this.setState({
      category:category,
      // handleModal:this.updateCategory,
    })
    this.toogleModal();
  }
  handlerAdd = () => {
      this.setState({
        category:newUserDataCategory(),
        // handleModal:this.addCategory,
      })
      this.toogleModal();
  }
  updateCategory = category => {
    console.log(category);
    let categories = this.state.categories;
    if(categories.some(n=> n.id === category.id)){
      const updateIndex = categories.findIndex(n=>n.id == category.id);
      const newList = [...categories];
      newList[updateIndex] = category;
      categories = newList;
    }
    this.setState({
      categories:categories,
      addModalVisible:false
    })
  }
  addCategory = category => {
    let categories = this.state.categories;
    if (!categories.some(n => n.id === category.id)) {
      categories = [...categories,{...category}];
    }
    this.setState({
      categories:categories,
      category:newUserDataCategory(),
      addModalVisible:false
    })

    // this.props.addUserdataCategory(category);
  }

	toogleModal = () => {
		this.setState({addModalVisible: !this.state.addModalVisible})
	}
  guardar = () => {

  }
  render() {
      const {loading,addModalVisible,categories,category,handleModal} = this.state;

      return (
          <SafeAreaView style={globalStyle.container,styles.container}>
              <Text style={styles.title}>{labels.title}</Text>
              {loading && 
                <ActivityIndicator style={globalStyle.loading} size="large" color={colors.accent} />
              }
              {!loading && 
                <>
                  <CategoryList 
                    categories={categories}
                    onDelete={this.handlerDelete}
                    onEdit={this.handlerUpdate}
                    />
                  <FAB 
                    text="+"
                    fabStyle={{backgroundColor: colors.primary}}
                    textStyle={{color: colors.primaryTextContrast}}
                    onPress={this.handlerAdd}
                    />
                  <View style={[styles.itemContent,styles.itemContent2]}>
                    <View style={[styles.items,{alignItems:'flex-end'}]}>
                      <Button text={labels.guardar} style={{width: '50%'}} onPress={this.guardar}/>
                    </View>
                  </View>
                  <CategoryModal 
                    visible={addModalVisible}
                    onCloseModal={this.toogleModal}
                    onCategoryModal={handleModal}
                    category={category}
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
        image:"file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540rodrigo81%252FHosteleria/ImagePicker/22c2aa54-e1a7-4648-aedd-4e63eeb008ad.jpg",
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
      addUserdataCategory,
      updateUserdataCategory,
      deleteUserdataCategory
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesScreen);