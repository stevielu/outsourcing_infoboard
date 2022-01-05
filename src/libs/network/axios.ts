/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import axios,{AxiosResponse,AxiosError} from 'axios'
import 'whatwg-fetch'
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    // in prod default to api host in config
    if(token && config.headers){
      config.headers.Authorization = token;
    }

    return config;
})

let resMiddleware:(res:AxiosResponse)=>AxiosResponse
axios.interceptors.response.use(
    function(response) {
      let res = response
      let url = response.request.responseURL||response.config.url;
      if(resMiddleware){
        res = resMiddleware(response)
      }
      return res;
    },
    function<T>(error:AxiosError<T>) {
      return Promise.reject(error);
    }
);

export type DownloadConfig = {
  request:{
    params?:object,
    config?:object,
  },
  response:{
    option?:object,
    filename?:string,
  },
  method:'post'|'get',


}

export default {
  setHeader:(content:{[name:string]:string})=>{
    axios.defaults.headers.common[content.key] = content.value ;
  },
  setMiddleware:(middleware:<T extends AxiosResponse>(res:T)=>T )=>{

    // 添加响应拦截器
    resMiddleware = middleware
  },
	post: <T>(url:string, params?:object):Promise<AxiosResponse<T>> => {
    let value = params
    if(value == null){
      value = {}
    }

    const res = axios.post<T>(url,value)
		return res


	},
  get:<T>(url:string, params?:object) => {
    let value = params
    let requestPath = url + `?`
    if(value){
      const item = value as {[name:string]:string}
      //拼接请求参数
      Object.keys(value).forEach((key,index,arr) =>{
        const isLast =( index === arr.length -1) ? true:false
        requestPath += `${key}=${item[key] ?item[key]:''}${isLast === true?'':'&'}`
      })

    }
    const res = axios.get<T>(requestPath)//window.fetch('https://restapi.amap.com/v3/weather/weatherInfo?city=330100&key=7b4716f8cc8b790852af79f9e12c7231')
		return res


	},

	delete: <T>(url:string, params?:object) => {
    let value = params
    if(value == null){
      value = {}
    }
    return axios.post<T>(url,value)
    .then(res => res.data)
    .catch(err => err)
	},

  download:<T>(url:string,config?:DownloadConfig) => {
    if(config && config.method == 'post'){
      return axios.post<T>(url,config.request.params,config.request.config)
    }
    return axios.get<T>(url)
  },

  // downloadByPost:(url:string,params:object) => {
  //   return axios.post(url,params,{responseType:'blob'})
  // }
}
