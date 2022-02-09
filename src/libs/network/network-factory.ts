import AxiosNetwork from './network-provider'
import WebSocket from './network-websocket'

enum ServiceType{
  M1 = 'M1',//主线路
  M2 = 'M2',
  S1 = 'M_SOCKET1',
}

export let baseURL = '/api/'
export default class NetworkFactory{
  private domain:any
  constructor(){
    let env = process.env.NODE_ENV
    //let baseURL = "http://183.213.26.151:8610/opSupPlat/"


    if(process.env.REACT_APP_ENVIRONMENT == 'mock'){
      this.domain = {
        main:'/test/',
        // socket:'ws://'+ window.location.host+baseURL
      }
    }else{
      if (env === 'development') {
        this.domain = {
          main:baseURL,
          // socket:'ws://'+ window.location.host+baseURL
        }
      }
      else if (env === 'production') {//
        baseURL = '/'
        this.domain = {
          main:baseURL,
          // socket:'ws://'+ window.location.host+baseURL
        }
      }
    }
  }

  public makeNetwork(config:{
    serviceName?:ServiceType,
  } = {serviceName:ServiceType.M1}){
    switch(config.serviceName){
      case ServiceType.M1:
        return AxiosNetwork(this.domain.main)
      default:
        return AxiosNetwork(this.domain.main)
    }
  }

  public makeWebSocket(namespace?:string,onError?:(e:any)=>void){
     return new WebSocket({socketUrl:this.domain.socket,timeout:5000,namespace:namespace,socketError:onError})
  }

}
