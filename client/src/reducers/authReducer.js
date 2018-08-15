import isEmpty from '../validation/is-empty';
import {SET_CURRENT_USER} from '../actions/types';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
const initialstate={
    isAutheticated:false,
    user:{}
}
export default function(state=initialstate,action){
    console.log('action.payload is',action.payload);
    switch(action.type){
        case SET_CURRENT_USER:
         console.log(!isEmpty(action.payload));
         return{
             ...state,
             isAuthenticated:!isEmpty(action.payload),
             user:action.payload
         }
       
       default:
         return state;


    }
}
