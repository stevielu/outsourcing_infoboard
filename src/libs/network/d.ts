/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import NetworkPromise from './middware'
export interface BasicResponse<T> {
  msg?:string;
  code:number;
  data:T;
}
export default interface NetworkApi{
  postItem<T>(path:string,params?:any):NetworkPromise<T>;
  getItem<T>(path:string,params?:any):NetworkPromise<T>;
  getItems<T>(path:string,params?:any):NetworkPromise<T>;
  delItem<T>(path:string,params?:any):NetworkPromise<T>;
  updateItem<T>(path:string,params?:any):NetworkPromise<T>;
  downloadItem(path:string,params?:any):Promise<void>;
  downloadByPost(path:string,params?:any):Promise<void>;
  get<T>(path:string,params?:object):NetworkPromise<T>;
  post<T>(path:string,params?:object):NetworkPromise<T>;
  setToken(token:string):void;
  pollingRequest<T>(path: string,interval:number, params?: any,method?:'post'|'get'):NetworkPromise<T>;
}
