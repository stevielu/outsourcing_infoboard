/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import AxiosClient,{DownloadConfig} from './axios'
import NetworkApi,{BasicResponse} from './d'
import NetworkPromise from './middware'
import {AxiosError,AxiosResponse} from 'axios'
import {Md5} from "ts-md5/dist/md5";
import AuthManager from '../auth'
import Logger from '../../utils/logger'


const Message = Logger('network')



class Network implements NetworkApi {
  private domain:string

  constructor(rootPath:string){
    this.domain = rootPath
  }

  private handleRsponse<T>(object:AxiosResponse<BasicResponse<T>>) {
      if(object.data){
        if(object.data.code){
          //custom code
          switch(object.data.code){
            case 500:
              const errObj = new Error(object.data.msg)
              throw errObj
            case 1002:
              const error = {code:object.data.code.toString(),message:'证书错误'}
              throw error
            default:
              if(object.data && object.data.code && object.data.code != 200){
                const error = {code:object.data.code.toString(),message:object.data.msg}
                throw error
              }
              break
          }
        }


        let content = object.data.data
        if(content && !Object.keys(content).includes('url')){//给每个接口数据添加加密后url的属性
          if(typeof content === 'object' && object.config.url){
            Object.assign(content,{url:Md5.hashStr(object.config.url).toString()})
          }
        }

        return content
      }
      else{//parase error
        throw new Error("parase error,response was null")
      }
  }

  private handleError<T>(error:AxiosError<T>){
      //http code
      switch(error.code){
        case '500':
          Message.errorAlert(error.message)
          break
        case '401':
          this._authRedirect('证书失效，请重新登录')
          break
        case '403':
          Message.errorAlert('对不起，您的权限不足')
          //this._authRedirect(error.message)
          break
        case '1001':
          this._authRedirect(error.message)
          break
        case '1002':
          this._authRedirect(error.message)
          break
        case '1003':
          this._authRedirect(error.message)
          break
        case '1004':
          this._authRedirect(error.message)
          break
        default:
          Message.errorAlert(error.message)
          break
      }


  }

  private _authRedirect(msg:string){
    Message.errorAlert(msg)
    AuthManager.Instance().logout()
  }

  public setToken(token:string){
    AxiosClient.setHeader({
      'Authorization':token
    })
  }

  public get<T>(path:string,params?:object){
    const response = new NetworkPromise<T>((reslove,reject)=>{
      AxiosClient.get<BasicResponse<T>>(path,params)
      .then(res => {
        reslove(this.handleRsponse(res))
      })
      .catch(err => {
        this.handleError(err)
        reject(new Error(`${path}:${err.message}`))
      })
    })

    return response
  }

  public post<T>(path:string,params?:object){
    const response = new NetworkPromise<T>((reslove,reject)=>{
      AxiosClient.post<BasicResponse<T>>(path,params)
      .then(res => {
        reslove(this.handleRsponse(res))
      })
      .catch(err => {
        this.handleError(err)
        reject(new Error(`${path}:${err.message}`))
      })
    })

    return response
  }


  public postItem<T>(path: string, params?: any){
    return this.post<T>(this.domain + path,params)
  }

  //获取单个数据
  public getItem<T>(path: string, params?: any){
    return this.post<T>(this.domain + path,params)
  }

  //获取分页数据
  //@pageSize 单次请求返回数据量
  public getItems<T>(path:string,params?:any,pageSize?:number){
    let data = {...params}
    if(pageSize){
      data = {...params,pageSize:pageSize}
    }
    return this.post<T>(this.domain + path,data)
  }

  //更新数据
  public updateItem<T>(path:string,params?:any){
    return this.post<T>(this.domain + path,params)
  }

  //删除数据
  public delItem<T>(path: string, params?: any) {
    return this.post<T>(this.domain + path,params)
  }

  //下载文件

  public downloadItem(path: string,params?: any,filename?:string){
    return this._download(path,{
      request:{
        params:params,
        config:params && {responseType:'blob'}
      },
      response:{
        filename:filename?filename:'huali-tec.csv'
      },
      method:params?'post':'get'
    })

  }

  public downloadByPost(path:string,params?:any,filename?:string){
    return this._download(path,{
      request:{
        params:params,
        config:{responseType:'blob'}
      },
      response:{
        option:{type:'application/octet-stream'},
      },
      method:'post'
    })
  }

  private _download<T>(path:string,params?:DownloadConfig){
    const makeDownloadResopnse = (response:any) => {
      let link = document.createElement('a')
      link.href = window.URL.createObjectURL(new Blob([response.data],params?.response.option))
      //{type:'application/octet-stream'}
      let filename = ''
      if(params?.response.filename){
        filename = params.response.filename
      }else{
        const responseName = response.headers['content-disposition']
        if(responseName){
          filename = decodeURI(responseName).split('=')[1]
        }
      }


      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    }

    return AxiosClient.download<BasicResponse<T>>(this.domain+path,params)
    .then(res => {
      if(res.data.code){//后台下载返回数据格式未进行统一，这里做单独处理
        return this.handleRsponse(res)
      }
      return res
    })
    .then(response => {
        if(!response){
          throw new Error("download err,data empty")
        }
        makeDownloadResopnse(response)
      }
    ).catch(err => this.handleError(err))
  }

  //定时轮询
  public pollingRequest<T>(path: string,interval:number, params?: any,method:'post'|'get' = 'post'){
    let polling:number
    // const task = () => {
    //   return this.post<T>(this.domain + path,params).next(res => {
    //     setTimeout(task,interval)
    //     return res
    //   })
    // }
    // return task()


    const p = new NetworkPromise<T>((resolve,reject) => {
      polling = setInterval(resolve,interval)
      if(method == 'post'){
        this.post<T>(this.domain + path,params)
        .then(res => resolve(res))
        .catch(err => reject(err))
      }else if(method == 'get'){
        this.get<T>(this.domain + path,params)
        .then(res => resolve(res))
        .catch(err => reject(err))
      }

    })

    return p


  }
}

export default (rootPath:string) => new Network(rootPath);
