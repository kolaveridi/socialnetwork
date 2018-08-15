import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileREducer from './profileReducer';
export default combineReducers({
   auth:authReducer,
   errors:errorReducer,
   profile:profileREducer
});