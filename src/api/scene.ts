/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import * as Model from '../model/scene'
import * as Obu from '../model/bsm'
import {RSIMessage} from '../model/rsi'
import EasyWebSocket from '../libs/network/network-websocket'
import {BSMData}  from '../libs/map/components/OBU'
import {V2XSceneMap} from './config'

class V2XSceneNetwork{
  network:EasyWebSocket
  constructor(network:EasyWebSocket){
    this.network = network

  }

  private V2XSceneMapper = (msg:Model.V2XScene,key:string) =>{
    const value = msg[key]
    if(Array.isArray(value)){
      const formatedStr = value.map(item => {
        const str = item.type ?`${key}-${item.type}`:key
        return V2XSceneMap[str.toUpperCase()]
      })
      return formatedStr
    }else{
      const newVal = value as Model.SecenType

      if(newVal.alam !== undefined && newVal.alam == 1){
        return V2XSceneMap[key.toUpperCase()]
      }else{
        return undefined
      }

    }

  }

  public getScene = (handle:(data:Model.BasicV2X<any>)=>void) => {

    this.network.connection('ws/base/SCENE').then(res => {
      console.log('SCENE connected...')
    })


    //let obu:BSMData = {}

    this.network.onMessage<Model.BasicV2X<any>>((msg)=>{
      Object.keys(msg.data).map(key => {
        const content = this.V2XSceneMapper(msg.data,key)//V2XSceneMap[key.toUpperCase()]
        if(!content){
          msg.data[key] = undefined//缺省
        }else{
          msg.data[key] = content
        }

        return msg
      })
      if(handle){
        Object.keys(msg.data).map(key => {

          if(msg.data[key] == undefined){

            delete msg.data[key]
          }
          return msg.data[key]
        })
        const newVal = Object.values(msg.data).flatMap(val => {return val})
        msg.data = newVal
        handle(msg)
      }

      //obu = {}
    })

    return
  }

  public closeScene = () => {
    this.network.closeSocket('ws/base/SCENE')
  }


  public getObuStatus = (handle?:(data:Obu.BasicOBU<Obu.OBUStatus>)=>void) => {

    this.network.connection('ws/base/OBU_STATUS').then(res => {
      console.log('OBU_STATUS connected...')

      this.network.onMessage<Obu.BasicOBU<Obu.OBUStatus>>((msg)=>{
        if(handle){
          handle(msg)
        }
      },'ws/base/OBU_STATUS')
    })
    return
  }

  public closeObuStatus = () => {
    this.network.closeSocket('ws/base/OBU_STATUS')
  }

  public getRSI = (handle?:(data:RSIMessage)=>void) => {

    this.network.connection('ws/base/RSI').then(res => {
      console.log('RSI connected...')

      this.network.onMessage<RSIMessage>((msg)=>{
        if(handle){
          const newMsg = msg.data.rtss.map(item => {
            item.rtsId = msg.device_id+'-'+item.rtsId
            return item
          })
          handle(msg)
        }
      },'ws/base/RSI')
    })





    return
  }

  public closeRsi = () => {
    this.network.closeSocket('ws/base/RSI')
  }

}


export const V2XScene = (network: EasyWebSocket) => new V2XSceneNetwork(network);
