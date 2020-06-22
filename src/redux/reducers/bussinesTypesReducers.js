import {URL_API, URL_API_BUSSINESTYPES, URL_API_TEMPLATES , BUSSINESTYPE_KEY} from '../../global.cfg/const';
import { AsyncStorage, ToastAndroid, Alert } from 'react-native';

const GET_TYPES = "bussinesTypes/GET_TYPES";
const ADD_TYPE = "bussinesTypes/ADD_TYPE";
const ADD_TYPES = "bussinesTypes/ADD_TYPES";
const SET_TYPES = "bussinesTypes/SET_TYPES";

// const GET_SERVER_TYPES = "bussinesTypes/GET_SERVER_TYPES";
// const SAVE_TYPES = "bussinesTypes/SAVE_TYPES";

const initialState = [
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
]

export default bussinesTypesReducers = (state = [], action) => {
  switch (action.type) {
    case GET_TYPES:
      return [ ...state];
    case ADD_TYPE:
			if (!state.some(n => n.id === action.item.id)) {
				return [...state, { ...action.type }];
      }
    case ADD_TYPES:
      action.items.forEach(element => {
        if (!state.some(n => n.id === element.id)) {
          return [...state, { ...element }];
        }        
      });
    case SET_TYPES:
      return [...action.items];
    default:
      return state
  }
};


export const getBussinesTypes = () => {
  return {
    type:GET_TYPES,
  }
}
export const addBussinesType = type => {
  return {
    type: ADD_TYPE,
    item: type
  }
}
export const addBussinesTypes = types => {
  return {
    type: ADD_TYPES,
    items: types
  }
}
export const setBussinesTypes = types => {
  return {
    type: SET_TYPES,
    items: types
  }
}
const getStoredBussinesTypes = async () => {
  let data;
  try {
    data = await JSON.parse(AsyncStorage.getItem(BUSSINESTYPE_KEY));
  } catch (error){
    data = initialState;
  }
  return data;
}
export const getServerBussinesTypes = async () => {
  let newData = [];
  await fetch( URL_API+URL_API_BUSSINESTYPES, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((json) => {
    newData=json;
  })
  .catch((error) => {
    newData = getStoredBussinesTypes();
  });
  return newData;
}
