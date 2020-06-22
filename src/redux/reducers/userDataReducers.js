/**
 * npm install react-native-uuid --save
 * npm install buffer --save
 */
import {
  Alert
} from 'react-native';
import {URL_API, URL_API_USERDATA , USERDATA_KEY} from '../../global.cfg/const';
import { AsyncStorage } from 'react-native';
// import uuid from 'react-native-uuid';
import uuid from 'uuid/v4';

const GET_USERDATA = "templates/GET_USERDATA";
const ADD_USERDATA = "templates/ADD_USERDATA";
const ADD_USERDATA_CATEGORY = "templates/ADD_USERDATA_CATEGORY";
const UPDATE_USERDATA_CATEGORY = "templates/UPDATE_USERDATA_CATEGORY";
const DELETE_USERDATA_CATEGORY = "templates/DELETE_USERDATA_CATEGORY";

const initialState = null;

export default templatesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERDATA:
      return { ...state};
    case ADD_USERDATA:
      return {...action.data};
    case ADD_USERDATA_CATEGORY:
      if (!state.categories.some(n => n.id === action.category.id)) {
        state.categories = [...state.categories,{...action.category}];
      }        
      return [...state];
    case UPDATE_USERDATA_CATEGORY:
      if(state.categories.some(n=> n.id === action.category.id)){
        const updateIndex = state.categories.findIndex(n=>n.id == action.category.id);
        const newList = [...state.categories];
        newList[updateIndex] = action.category;
        state.categories = newList;
      }
      return [...state];
    case DELETE_USERDATA_CATEGORY:
      if(state.categories.some(n=> n.id === action.category.id)){
        const newList = state.categories.filter(n=>n.id == action.category.id);
        state.categories = newList;
      }
      return [...state];
    default:
      return state
  }
};


export const getUserdata = () => {
  return {
    type:GET_USERDATA,
  }
}
export const addUserdata = userData => {
  return {
    type:ADD_USERDATA,
    data:userData
  }
}

export const addUserdataCategory = category => {
  return {
    type:ADD_USERDATA_CATEGORY,
    category:category
  }
}
export const updateUserdataCategory = category => {
  return {
    type:UPDATE_USERDATA_CATEGORY,
    category:category
  }
}
export const deleteUserdataCategory = category => {
  return {
    type:DELETE_USERDATA_CATEGORY,
    category:category
  }
}

export const getStoredUserData = async () => {
  try {
    const stored = await AsyncStorage.getItem(USERDATA_KEY);
    return JSON.parse(stored);
  } catch (error){
    return null;
  }
}
export const getServerUserData = async () => {
  let userdata = null;
  fetch( URL_API+URL_API_USERDATA, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    if(response.ok){
        response.json()
    }
  })
  .then(json => {
    userdata=json;
  })
  if(userdata==null) {
    userdata = await getStoredUserData();
  }
  return userdata;
}
export const saveUserData =  async data => {
  try {
      const resp = await AsyncStorage.setItem(USERDATA_KEY,JSON.stringify(data));
      return true;
  } catch (error) {
    Alert.alert('Error','Error al guardar los datos en el sistema');
    return false;
  }
}
export const newUserDataCategory = () => {
  return {
      id:uuid(),
      name:"",
      description:"",
      image:null,
      type:1
  };
}
