import { AsyncStorage, Alert } from 'react-native';
const BUSSINESTYPE_KEY = "4Urk97HEtvu9kP9f1z35_WkStrgGvQ5t5cmEdlg3i";

//Datos de prueba
const dummyDataServerBussinesType = [
  {
    id:1,
    name:'Bar',
    templates:[]
  },{
    id:2,
    name:'Restaurante',
    templates:[]
  },{
    id:3,
    name:'Pub',
    templates:[]
  }
];
const emptyBussinesTypeData = {
  id:null,
  name:'',
  templates:[]
}
/**
 * Recupera los datos del servidor
 */
const getServerBussinesTypeData = async () => {
  let dataServer;
  //Recupera los datos del servidor
  // ...
  //temporalmente carga datos de prueba
  dataServer = [...dummyDataServerBussinesType];
  await setBussinesTypes(dataServer);
}
/**
 * Recuepra los datos del servidor
 * Si no puede recupera los datos del dispositivo
 */
const getBussinesTypes = async () => {
  try {
    data = JSON.parse(AsyncStorage.getItem(BUSSINESTYPE_KEY));
  } catch (error){
      data = []
      Alert.alert('Error','Error al recuperar los datos del dispositivo\n'+error.message);
  }
  return data;
}
const setBussinesTypes = async (data) => {
  let resp;
  try {
      resp = await AsyncStorage.setItem(BUSSINESTYPE_KEY,JSON.stringify(data));
  } catch (error) {
    resp=false;
    Alert.alert('Error','Error al guardar los datos en el sistema\n'+error.message);
  }
  return resp;
}

export { getServerBussinesTypeData,getBussinesTypes,setBussinesTypes };
