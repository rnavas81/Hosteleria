import {URL_API, URL_API_BUSSINESTYPES, URL_API_TEMPLATES , TEMPLATES_KEY} from '../../global.cfg/const';
import { AsyncStorage } from 'react-native';

const GET_TEMPLATES = "templates/GET_TEMPLATES";
const ADD_TEMPLATE = "templates/ADD_TEMPLATE";
const ADD_TEMPLATES = "templates/ADD_TEMPLATES";
const SET_TEMPLATES = "templates/SET_TEMPLATES";

const initialState = []

export default templatesReducers = (state = [], action) => {
  switch (action.type) {
    case GET_TEMPLATES:
      return { ...state };
    case ADD_TEMPLATE:
      if (!state.some(n => n.id === action.item.id)) {
        return [...state, { ...action.type }];
      }
    case ADD_TEMPLATES:
      action.items.forEach(element => {
        if (!state.some(n => n.id === element.id)) {
          return [...state, { ...element }];
        }        
      });
    case SET_TEMPLATES:
      return [...state,[...action.items]];
    default:
      return state
  }
};


export const getTemplates = () => {
  return {
    type:GET_TEMPLATES,
  }
}
export const addTemplate = template => {
  return {
    type:ADD_TEMPLATE,
    item:template
  }
}
export const addTemplates = templates => {
  return {
    type:ADD_TEMPLATES,
    items:templates
  }
}
export const setTemplates = templates => {
  return {
    type:SET_TEMPLATES,
    items:templates
  }
}

const getStoredTemplates = async () => {
  let data;
  try {
    data = await JSON.parse(AsyncStorage.getItem(TEMPLATES_KEY));
  } catch (error){
    data = initialState;
  }
  return data;
}
export const getServerTemplates = async () => {
  let newData = [];
  await fetch( URL_API+URL_API_TEMPLATES, {
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
    newData = getStoredTemplates();
  });
  return newData;
}
