
import {GET_ERRORS} from '../actions/types';
const initialstate={};
export default function(state=initialstate,action){
    console.log('state is',initialstate);
    console.log('action is',action);
    switch(action.type){
       case GET_ERRORS:
          return action.payload;
       default:
         return state;


    }
}