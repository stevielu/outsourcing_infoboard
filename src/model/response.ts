/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

export interface PageObj<T>{
  endRow:number;
  hasNextPage: boolean;
  hasPreviousPage: false;
  isFirstPage: true;
  isLastPage: true;
  list: T[];
  navigateFirstPage:number;
  navigateLastPage:number;
  navigatePages:number;
  navigatepageNums: Array<number>;
  nextPage:number;
  pageNum:number;
  pageSize:number;
  pages:number;
  prePage:number;
  size:number;
  startRow:number;
  total:number;
}

export interface ResponseObj<T> {
  data:T|PageObj<T>;
  code:number;
}

export interface BasicModel{
  createTime:number|string;
  creator:string;
  modifyTime:number|string;
  modifier:string;
}
