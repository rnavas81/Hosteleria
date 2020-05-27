const GET_TEMPLATES = "templates/GET_TEMPLATES";
const SAVE_TEMPLATES = "templates/SAVE_TEMPLATES";

const initialState = {

}

export default function templatesReducers (state = initialState, action) {
  switch (action.type) {

  case GET_TEMPLATES:
    return { ...state };
  case SAVE_TEMPLATES:
    return { ...state };

  default:
    return state
  }
};


export const getTemplates = (params) => {
  return {
    type: GET_TEMPLATES,
    params
  }
};

export const saveTemplates = (params) => {
  return {
    type: SAVE_TEMPLATES,
    params
  }
};
