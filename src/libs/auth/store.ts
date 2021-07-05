/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { handleActions,createAction } from 'redux-actions'
export enum ActionType{
  SET_AUTH_STATUS = "SET_AUTH_STATUS",
  GET_AUTH_STAUTS = "GET_AUTH_STAUTS",
}

const reducer = handleActions<{isAuthenticated:boolean}>(
  {
    [ActionType.SET_AUTH_STATUS]:(state,action) => {
      console.log('set login',action.payload.isAuthenticated)
      return {isAuthenticated:action.payload.isAuthenticated}
    },
    [ActionType.GET_AUTH_STAUTS]:(state,action) => {
      return {...state}
    },
  },
  {
    isAuthenticated:localStorage.getItem('token') == null ? false:true,
  }
);

export const setStatus = createAction(ActionType.SET_AUTH_STATUS,(isAuthenticated:boolean)=>{
  return {isAuthenticated:isAuthenticated}
});

export const NAME = 'auth'
export default reducer
