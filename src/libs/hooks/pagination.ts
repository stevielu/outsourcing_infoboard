/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useState} from 'react'
import usePrevious from './previous'

type pageType = {
  total:number|undefined;
  pageSize:number|undefined;
  nextPage:number|undefined;
}

export const usePagination = (data:pageType,nextHandle?:(pageNum:number) => void) => {
  const [pageNum,setPageNum] = useState<number>(1)
  const [pageSize,setPageSize] = useState<number>(data.pageSize ? data.pageSize:20)

  //分页点击下一页操作
  const onNext = (page:number,pageSize?:number) => {
    setPageNum(page)
    if(nextHandle){
      nextHandle(page)
    }
    //other handle....
  }


  //分页复位
  const resetPage = () => {
    setPageNum(1)
  }


  const onChange = (page:number, pageSize?:number) => {
    onNext(page,pageSize)
  }

  //当分页绑定Table组件时使用
  const onTableChange = (pagination:any, filters:any, sorter:any) =>{

  }

  //当分页Page Size 发生改变
  const onShowSizeChange = (current:any, size:any) => {
    setPageSize(size)
  }

  const pagination = {
    total:data.total,
    pageSize:pageSize,
    current:pageNum,
    onShowSizeChange:onShowSizeChange,
    onChange:onChange,
  }


  return {pageNum,onNext,resetPage,pageSize,setPageSize,onTableChange,onShowSizeChange,onChange,pagination}
}
