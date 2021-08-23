/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import {useState,useRef,useMemo,useEffect,DependencyList} from 'react';
import { useSelector, useDispatch } from 'react-redux';



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


export const usePolly = <T>(
  apiService:ApiServiceType<T>,
  next:(res:T)=>Promise<void>,
  interval:number,
  parameters?:any,
  deps?: DependencyList,
  complete?:RequestCallback,
  onError?:RequestCallback,
  continueWhenFail?:boolean
) =>{
  const [data,setData] = useState<UnwarpPromise<ReturnType<typeof apiService>>>()
  const [loading,setLoading] = useState(true)

  /*数据*/
  const exec = (params?:Object)=>{
    setLoading(true)
    return apiService(params?params:parameters).then(res =>{
      if(res){
        if(complete){
          complete(res,null)
        }
        setData(res)
      }

      setLoading(false)
      next(res)
    }).catch(err => {
      setLoading(false)
      onError && onError(null,err)
    })
  }
  let timmer:ReturnType<typeof setTimeout>|null = null
  const request = async (params?:Object) => {
    const fn = () => {
      timmer = setTimeout(()=>{
        exec(params).then(_ => fn())
      },interval)
    }
    fn()
  }

  const stop = () => {
    if(timmer){
      clearTimeout(timmer)
    }
  }

  useEffect(()=>{
    exec().then(_ =>{
      request()
    }).catch(_ =>{
      if(continueWhenFail === true){
        request()
      }
    })
    return ()=>{
      stop()
    }
  },[deps])
  return {stop,request,data,loading}
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
