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


export const useList = <T>(nameField:string,api:Api.ListAPI<T>) => {
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

  const remove = useCallback(async (values:any)=>{
    const data = await removeApi.request(values.id);
    if (data.error) {
      Toast.errorAlert(`删除失败:${data.error.message}`);
    }
    else {
      dispatch(setReload(nameField));
    }

  },[])

  const add = useCallback(async (values:any)=>{
    const data = await addApi.request(values);
    if (data.error) {
      Toast.errorAlert(`创建失败:${data.error.message}`);
    }
    else {
      dispatch(setReload(nameField));
    }
  },[])

  const update = useCallback(async (values:any)=>{
    const data = await updateApi.request(values);
    if (data.error) {
      Toast.errorAlert(`更新失败:${data.error.message}`);
      throw (data.error);
    }
    else {
      dispatch(setReload(nameField));
    }
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
