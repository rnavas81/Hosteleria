import { AsyncStorage, Alert } from 'react-native';

const MIMENU_KEY = "lMxzh2wvYdnwEMG9473w_Cur1ZnR8d8koYlcLSM64";
const newCategory = (id,name,description,image,type) => ({
    id:id?id:0,
    name:name?name:"",
    description:description?description:"",
    image:image?image:null,
    type:type?type:1,
})
const newData = () => ({
    id: null,
    personal: {
        name:'',
        type:0,
        address:'',
        phone:'',
        timetable:'',
        logo:null,
        local:null,
    },
    categories:[]
})
const getData = async () =>{
    let data = {};
    try {
        data = await AsyncStorage.getItem(MIMENU_KEY);
    } catch (error){
        data = JSON.stringify(newData());
        Alert.alert('Error','Error al recuperar los datos del sistema\n'+error.message);
    }
    if(data==null)data = JSON.stringify(newData());
    data = JSON.parse(data);
    if(data.categories==null){
        data.categories = [
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
    }
    return data;
};

const saveData = async data => {
    try {
        const resp = await AsyncStorage.setItem(MIMENU_KEY,JSON.stringify(data));
    } catch (error) {
        Alert.alert('Error','Error al guardar los datos en el sistema');
    }
}
export {newData,saveData,getData}