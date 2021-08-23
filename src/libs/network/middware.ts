/*
Copyright (c) 2021 by Stevie. All Rights Reserved.
*/
import LoadingEffector from './loading-effector'
import {Coordinates2D} from '../map/common'
import {MapUtils} from '../map/'
import Formatter from '../base/formatter'
import {uuid} from '../utils/'
const timeFormatter = Formatter('Middware')


export default class NetworkPromise<T> extends Promise<T>{
  private _completed = false
  private _reject?: (<TResult = never>(reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  public pollingTaskId:number = 0
  constructor(
      executor:(resolve:(value:T) => void, reject:(reason:any) => void) => void
  )
  {

    super((resolve:(value:T)=>void, reject:(reason:any)=>void) => {
      return executor(resolve, reject);
    });

  }

  next = <TResult1 = T, TResult2 = never>(fullfill?:((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,reject?:((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null) =>{
    super.then(fullfill,reject)
    return this
  }

  error = <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null) => {
    super.catch(onrejected)
    return this
  }

  //加载效果
  loading = (beforeFn?:(value:boolean)=>void,afterFn?:(value:boolean)=>void,msg?:{success:string,fail:string}) => {
    if(beforeFn){
      beforeFn(this._completed)
    }else{
      LoadingEffector.onLoading()
    }
    this.then(_ =>{
      this._completed = true
      if(afterFn){
        afterFn(this._completed)
      }else{
        LoadingEffector.finished(msg && msg.success)
      }
    }).catch(err => {
      LoadingEffector.error((msg && msg.fail))
      return err
    })

    return this
  }
  //添加对象
  addObject = (target:Object) => {
    this.then(value => {
      if(typeof value === 'object'){
        Object.assign(value,target)
      }
      return value
    }).catch(err => {
      return err
    })

    return this
  }

  //添加key
  addKey = <U extends {id?:string|number}>(fn:(value:T)=>U) => {
    this.then(value => {
      const id = fn(value)
      Object.assign(value,{key: id?id:uuid(14)})
      return value
    }).catch(err => {
      return err
    })
    return this
  }

  //数组添加key
  addKeys = <U extends {id?:string|number}>(fn:(value:T)=>Array<U>) => {
    super.then(value => {
      const arr = fn(value)
      arr.map(item => {
        if(typeof value === 'object'){
          Object.assign(item,{key:item.id ? item.id:uuid(14)})
        }
      })
      return value
    }).catch(err => {
      return err
    })
    return this
  }

  //转高德坐标
  convertGPS = (from:{lattitude:{[name:string]:number},longitude:{[name:string]:number}},type:'JC02'|'Other' = 'JC02') =>{
    this.then(value => {
      const gps:Coordinates2D = {lattitude:Object.values(from.lattitude)[0],longitude:Object.values(from.longitude)[0]}
      let newGps = gps
      if(type === 'JC02'){
        newGps = MapUtils.ws84tojc02(gps)
      }
      Object.assign(value,{[Object.keys(from.lattitude)[0]]:newGps.lattitude})
      Object.assign(value,{[Object.keys(from.longitude)[0]]:newGps.longitude})
      return value
    }).catch(err => {
      return err
    })

    return this
  }

  convertGPSGroup = (fn:(value:T)=>Array<Object>,key:{lat:string;lon:string},type:'JC02'|'Other' = 'JC02') =>{
    this.then(value => {
      const arr = fn(value)
      arr.map(item =>{
        // Object.assign(item,{[key.lat]:1})
        let gps = {} as Coordinates2D
        const findValue = <U>(obj:U) => {
          for(const childrenKey in obj){
            const val = obj[childrenKey]
            if(Array.isArray(val)){
              findValue(val)
            }else{
              if(childrenKey === key.lat){
                gps.lattitude = Number(val)
              }
              if(childrenKey === key.lon){
                gps.longitude = Number(val)
              }

              if(gps.lattitude && gps.longitude){
                let newGps = gps
                if(type === 'JC02'){
                  newGps = MapUtils.ws84tojc02(gps)
                }
                Object.assign(obj,{[key.lat]:newGps.lattitude})
                Object.assign(obj,{[key.lon]:newGps.longitude})
                gps = {} as Coordinates2D
              }
            }
          }
        }
        findValue(item)
      })
      return value
    }).catch(err => {
      return err
    })

    return this
  }


  //时间格式化
  timeStamp2String = <U>(fn:(value:T)=>[string|Array<string>,number|string|Array<U>]) => {
    this.then(value => {
      const res = fn(value)
      const findValue = <U>(obj:U) => {
        for(const childrenKey in obj){
          const timeVal = obj[childrenKey]
          if(Array.isArray(timeVal)){
            findValue(timeVal)
          }else{
            if(res[0].includes(childrenKey)){
              Object.assign(obj,{[childrenKey]:timeFormatter.timeStamp2String(Number(timeVal))})
            }
          }
        }
      }

      if(Array.isArray(res[1])){
        res[1].map(item => {
          findValue(item)
        })
      }else{
        const time = res[1]
        if(Array.isArray(res[0])){
          res[0].map(key => {
            Object.assign(value,{[key]:timeFormatter.timeStamp2String(time)})
          })
        }else{
          Object.assign(value,{[res[0]]:timeFormatter.timeStamp2String(time)})
        }

      }

      return value
    }).catch(err => {
      return err
    })

    return this
  }

  cancelPollingTask(){
    clearInterval(this.pollingTaskId)
  }

  filter(){

  }


  cache(){
  }
}
