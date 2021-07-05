/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { handleActions,createAction } from 'redux-actions'
import { ReloadAction } from '../constant/reload'
export const setReload = createAction(ReloadAction.SET_RELOAD,(namespace:string)=>{
  return namespace
});


export const reloadReducer = handleActions<any>(
  {
    //重新加载标志位
    [ReloadAction.SET_RELOAD]:(state,action) => {
      let {reload,reloadList} = state

      if(reloadList[action.payload] === undefined){
        reloadList[action.payload] = reload
      }else{
        reloadList[action.payload] = !reloadList[action.payload]
      }

      return {
        ...state,
        reload:reload,
        reloadList:reloadList
      }
    },
  },
  {
    reload:false,
    reloadList:{},
  }
);
