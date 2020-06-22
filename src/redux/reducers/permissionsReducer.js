
const GET_PERMISSION = "templates/GET_PERMISSION";
const ADD_PERMISSION = "templates/ADD_PERMISSION";
const initalState = {};
export default permissionReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PERMISSION:
      return { ...state};
    case ADD_PERMISSION:
      state[action.permission]=action.value;
      return {...state};
    default:
      return state
  }
};

export const getPermissions = () => {
  return {
    type:GET_PERMISSION,
  }
}
export const addPermission = (permission,value) => {
  return {
    type:ADD_PERMISSION,
    permission:permission,
    value:value
  }
}