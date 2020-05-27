import {URL_API} from '../../global.cfg/const';
import { Alert } from 'react-native';
const GET_TYPES = "bussinesTypes/GET_TYPES";
const GET_SERVER_TYPES = "bussinesTypes/GET_SERVER_TYPES";
const SAVE_TYPES = "bussinesTypes/SAVE_TYPES";

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

export default bussinesTypesReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVER_TYPES:
      // Alert.alert(JSON.stringify(types));
      return [ ...state];
    case GET_TYPES:
      return [ ...state];
    case SAVE_TYPES:
      return [ ...state];
    default:
      return state
  }
};


export const getBussinesTypes = (params) => {
  return {
    type: GET_TYPES,
  }
};

export const getServerBussinesTypes = async (params) => {
  return async (dispatch) => {
    let newData
    try {
      let response = await fetch( URL_API, {
        method:'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },  body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue'
        })
      }).catch((error) => response=initialState);
      newData=await response.json();      
    } catch (error) {
      newData=initialState;
    }

    dispatch(getBussinesTypes(newData));
  }
};

export const saveBussinesTypes = (params) => {
  return {
    type: SAVE_TYPES,
    params
  }
};
