/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import * as Base from '../model/response'
import {CrossingConfig,CrossingNumber} from '../model/crossing'
import {RSUSpat} from '../model/rsu'
import NetworkApi from '../libs/network/d'
import * as Libs from '../libs/'
import { map } from 'lodash';
import EasyWebSocket from '../libs/network/network-websocket'
import {SpatData} from '../libs/map/components/RSULayer'
import {LightColor} from '../libs/map//map-light'



class SpatNetwork{
  network:EasyWebSocket
  constructor(network:EasyWebSocket){
    this.network = network
  }

  public getSpat = (handle:(spat:any)=>void) => {
    this.network.connection('ws/base/SPAT').then(res => {
      console.log('rsu spat connected...')
    })

    let spat:SpatData = {}

    const colorFormatter = (str:string) => {
      switch(str){
        case 'red':
          return LightColor.Red
        case 'protected_green':
          return LightColor.Green
        default:
          return LightColor.Default

      }
    }
    this.network.onMessage<RSUSpat>((msg)=>{
      spat[msg.intersection_id] = msg.phases.map(item => {
        return {
          count:item.likelyEndTime,
          color:colorFormatter(item.light),
          phaseNumber:item.id,
        }

      })



      handle(spat)
      spat = {}
    })

    return
  }

  public close = () => {
    this.network.closeSocket()
  }

}

class RoadInfoNetwork{
  private network:NetworkApi

  constructor(network:NetworkApi){
    this.network = network
  }



  public list = () => {
    const numbers = this.network.getItems<Base.PageObj<CrossingNumber>>('intersConf/findInters')
    return numbers
  }


  public get = (cn:number) => {
    const config = this.network.getItems<CrossingConfig>('intersConf/findByIntersNo',{intersNo:cn}).then(res => {
      if(res){
        return res
      }
    })

    return config
  }

}

export const Spat = (network: EasyWebSocket) => new SpatNetwork(network);
export const CorssingInfo = (network: NetworkApi) => new RoadInfoNetwork(network);
