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
const getEmptyData = () => {
    return newData();
}
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
        data.categories = []
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
export {newData,saveData,getData,getEmptyData}