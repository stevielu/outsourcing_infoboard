/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { reloadFlag } from '../../selectors/config'


import Logger from '../../utils/logger'
import { setReload } from '../../reducers/config/reload'
import * as Api from '../../api'
import {useRequest,usePagination} from '../../libs/'


const Toast = Logger('')


export const useList = <T>(nameField:string,api:Api.ListAPI<T>,config?:{
  store:boolean,//redux 存储
}) => {
  //reload
  const dispatch = useDispatch()
  const {reloadList} = useSelector(reloadFlag)
  const deps = reloadList[nameField]
  //action
  const list = useRequest(api.list)
  const get = useRequest(api.get)
  const updateApi = useRequest(api.update)
  const removeApi = useRequest(api.delete)
  const addApi = useRequest(api.add)

  const remove = useCallback((values:any)=>{
    return removeApi.request(values.id).then(data => {
      if(data.error){
        Toast.errorAlert(`删除失败:${data.error.message}`)
      }else{
        dispatch(setReload(nameField))
      }
    })

  },[])

  const add = useCallback((values:any)=>{
    return addApi.request(values).then(data => {
      if(data.error){
        Toast.errorAlert(`创建失败:${data.error.message}`)
      }else{
        dispatch(setReload(nameField))
      }
    })
  },[])

  const update = useCallback((values:any)=>{
    return updateApi.request(values).then(data => {
      if(data.error){
        Toast.errorAlert(`更新失败:${data.error.message}`)
        throw(data.error)
      }else{
        dispatch(setReload(nameField))
      }
    })
  },[])

  //分页处理
  const pageTotal = list.data && list.data.total
  const pageSize = list.data && list.data.pageSize
  const nextPage = list.data && list.data.nextPage
  const page = usePagination({
    total:pageTotal,
    pageSize:pageSize,
    nextPage:nextPage
  },(pageNum:number) => list.request({pageNum:pageNum,pageSize:pageSize})).pagination

  return {list,get,add,remove,page,deps,nameField,update}
}
