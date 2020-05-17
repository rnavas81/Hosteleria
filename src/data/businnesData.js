import { AsyncStorage, Alert } from 'react-native';

const MIMENU_KEY = "lMxzh2wvYdnwEMG9473w_Cur1ZnR8d8koYlcLSM64";

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
    }
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
    return JSON.parse(data);
};

const saveData = async data => {
    Alert.alert(null,JSON.stringify(data));
    try {
        const resp = await AsyncStorage.setItem(MIMENU_KEY,JSON.stringify(data));
    } catch (error) {
        Alert.alert('Error','Error al guardar los datos en el sistema');
    }
}
export {newData,saveData,getData}