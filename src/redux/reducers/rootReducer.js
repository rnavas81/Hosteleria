import { combineReducers } from 'redux';
import bussinesTypesReducers from './bussinesTypesReducers';
import templatesReducers from './templatesReducers';

const rootReducer = combineReducers({
  bussinesTypes: bussinesTypesReducers,
  templates: templatesReducers,
});

export default rootReducer;
