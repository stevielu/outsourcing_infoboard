/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useState,useRef,useMemo,useEffect,DependencyList} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isFunction } from 'util';



type UnwarpPromise<T> = T extends PromiseLike<infer U> ? U : T
type ApiServiceType<T> = (obj?:any) => Promise<T>

export type RequestCallback = (res?:any,error?:any) => void

async function awaitWrap<T, U = any>(promise: Promise<T>): Promise<[U | null, T | null]> {
  try {
    const data = await promise;
    const result: [null, T] = [null, data];
    return result;
  }
  catch (err) {
    const result_1: [U, null] = [err, null];
    return result_1;
  }
}


const store = () => {

}

type SetParams = ()=>Object

let timmer:ReturnType<typeof setTimeout>|null = null
export const usePolly = <T>(
  args:{
    apiService:ApiServiceType<T>;
    interval:number;
    parameters?:Object|SetParams;
    next?:(res:T)=>void;
    deps?: DependencyList;
    continueWhenFail?:boolean;
    onError?:RequestCallback;
  },
  auto:boolean = true
) =>{

  const [data,setData] = useState<UnwarpPromise<ReturnType<typeof args.apiService>>>()
  const [loading,setLoading] = useState(true)

  /*数据*/
  const exec = async (params?:Object|SetParams)=>{
    let reqVal:Object = {}
    setLoading(true)
    if(isFunction(params) === true){
      const setValue = params as SetParams
      reqVal = setValue()
    }else{
      reqVal = params as Object
    }
    try {
      const res = await args.apiService(reqVal);
      if (res) {
        setData(res);
      }

      setLoading(false);
      args.next && args.next(res);
    }
    catch (err) {
      setLoading(false);
      args.onError && args.onError(null, err);
    }
  }

  const request = async (params?:Object) => {

    const fn = () => {
      timmer = setTimeout(()=>{
        exec(params).then(_ => fn())
      },args.interval)
    }

    fn()
  }

  const stop = () => {
    if(timmer){
      clearTimeout(timmer)
    }
  }

  const start = () => {
    exec().then(_ =>{
      request(args.parameters)
    }).catch(_ =>{
      if(args.continueWhenFail === true){
        request(args.parameters)
      }
    })
  }

  useEffect(()=>{
    if(auto == true){
      start()
    }

    return ()=>{
      stop()
    }
  },[args.deps])
  return {start,stop,request,data,loading}
}

export const useRequest =   <T>(
  apiService:ApiServiceType<T>,
  deps?: DependencyList,
  config?:{
    useStore:boolean,
    keyPath:string
  }
) => {
  const [data,setData] = useState<UnwarpPromise<ReturnType<typeof apiService>>>()
  const [error,setError] = useState()
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  /*数据*/
  const request = async (parameters?:any,complete?:RequestCallback) => {
      const [err,res] = await awaitWrap(apiService(parameters))

      if(res){
        if(config && config.useStore === true){
          const val = res as any
          if(val.url){
            dispatch({type:config.keyPath,payload:res})
          }
        }

        if(complete){
          complete(res,null)
        }
        setData(res)
      }

      if(err){
        setError(err)
        if(complete){
          complete(null,err)
        }
      }

      setLoading(false)

      return {result:res,error:err}
  }

  return {request,data,loading,error}
}
