/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
/*Table*/
import { setColumns } from '../../reducers/config/table'
import { tableConfig } from '../../selectors/config'


/****Table****/

export const useDynamicColumns = (config:any,namepsace:string) => {
  const {columns} = useSelector(tableConfig)
  const dispatch = useDispatch()
  //初次加载
  useEffect( () => {
    dispatch(setColumns(config,namepsace))
  }, [])
  return columns
}

export const useUpdateColumns = (config:any,namepsace:string) => {
  const dispatch = useDispatch()
  dispatch(setColumns(config,namepsace))

  return config
}

export const useFetchTableColumns = (namepsace:string) => {
  const {orginColumns} = useSelector(tableConfig)
  return orginColumns[namepsace]
}
export default {useDynamicColumns,useUpdateColumns,useFetchTableColumns}
