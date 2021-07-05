/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { handleActions,createAction } from 'redux-actions'
import { TableConfigType } from '../constant/config'

export type ColumnValue = {
  [name:string]:any
};

export const setColumns = createAction(TableConfigType.SET_COLUMN,(columns:any,namepsace:string)=>{

  return {columns,namepsace}
});

export const getColumns = createAction(TableConfigType.GET_COLUMN,(namepsace:string)=>{

  return {namepsace}
});

export const tableReducer = handleActions<any>(
  {
    [TableConfigType.SET_COLUMN]:(state,action) => {
      let {columns,orginColumns} = state
      columns[action.payload.namepsace] = action.payload.columns

      if(orginColumns[action.payload.namepsace] == undefined){
        orginColumns[action.payload.namepsace] = action.payload.columns
      }
      return {
        columns:columns,
        orginColumns:orginColumns,
      }
    },
    [TableConfigType.GET_COLUMN]:(state,action) => {
      let {columns} = state
      return {
        columns:columns[action.payload.namepsace],
        orginColumns:'',
      }
    },
  },
  {
    columns:{},
    orginColumns:{},
  }
);
