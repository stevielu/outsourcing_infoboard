/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useCallback,useState } from 'react'


import Logger from '../../utils/logger'

import * as Api from '../../api'
import {useRequest,usePagination} from '../../libs/'


const Toast = Logger('')
type UnwarpPromise<T> = T extends PromiseLike<infer U> ? U : T
/**
 *
 * @funcParam {SearchAPI} api              搜索api
 * @funcParam {String} tableField          如果是table，指定该字段则会自动刷新指定table内容
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       code: 200,
 *       data: {}
 *     }
 */
export const useSearch = <T>(api:Api.SearchAPI<T>) => {
  const [keyWord,setKeyWord] = useState({})
  const [result,setResult] = useState<UnwarpPromise<ReturnType<typeof api>>>()
  //action
  const search = useRequest(api)



  const submit = useCallback((values:any)=>{
    setKeyWord(values)
    return search.request(values).then(data => {
      if(data.error || !data){
        Toast.errorAlert(`搜索失败`)
      }else{
        if(data.result){
          setResult(data.result)
        }

      }

      return data
    })

  },[])

  //分页处理
  const pageTotal = search.data && search.data.total
  const pageSize = search.data && search.data.pageSize
  const nextPage = search.data && search.data.nextPage
  const page = usePagination({
    total:pageTotal,
    pageSize:pageSize,
    nextPage:nextPage
  },(pageNum:number) => search.request({pageNum:pageNum,pageSize:pageSize,...keyWord})).pagination

  return {submit,page,result}
}
