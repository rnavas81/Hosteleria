import { combineReducers } from 'redux';
import bussinesTypesReducers from './bussinesTypesReducers';
import templatesReducers from './templatesReducers';
import userDataReducers from './userDataReducers';
import permissionReducers from './permissionsReducer';

const rootReducer = combineReducers({
  bussinesTypes: bussinesTypesReducers,
  templates: templatesReducers,
  userdata:userDataReducers,
  permissions:permissionReducers,
});

export default rootReducer;
