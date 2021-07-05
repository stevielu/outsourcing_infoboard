/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import * as Model from '../model/bsm'
import EasyWebSocket from '../libs/network/network-websocket'
import {BSMData}  from '../libs/map/components/OBU'
import {VehType} from '../libs/map/map-motion'


class BSMNetwork{
  network:EasyWebSocket
  constructor(network:EasyWebSocket){
    this.network = network
  }

  private _getCarType = (type:number) => {
    let carType:VehType = VehType.VAN
    switch(type){
      case 1:carType = VehType.SPECIAL_VEH;break
      case 4:carType = VehType.VAN;break
      case 10:carType = VehType.MINI_BUS;break
      case 20:carType = VehType.PICKUP;break
      case 64:carType = VehType.AMBULANCE;break
      case 62:carType = VehType.FIRE_TRUCK;break
      case 66:carType = VehType.POLICE;break
      case 55:carType = VehType.SCHOOL;break
      default:carType = VehType.VAN;break
    }
    return carType
  }

  private _parseBSM = (msg:Model.BasicOBU<Model.BSM>) => {
      let carType = this._getCarType(msg.data.vehicleClass.classification)
      const data = {
        longitude:parseFloat(msg.data.pos.long_),
        lattitude:parseFloat(msg.data.pos.lat),
        heading:msg.data.heading,
        speed:msg.data.speed,
        time_stamp:msg.time_stamp,
        type:carType
      }
      return data
  }

  public getBSM = (handle:(bsm:BSMData)=>void) => {
    this.network.connection('ws/base/BSM').then(res => {
      console.log('BSM connected...')
    })

    let obu:BSMData = {}
    this.network.onMessage<Model.BasicOBU<Model.BSM>>((msg)=>{
      if(msg.data_source == Model.BSMDataSource.OBU){//只处理obu来的数据
        obu[msg.device_id.toString()] = this._parseBSM(msg)
        handle(obu)
        obu = {}
      }
    })

    return
  }


  private _parseVehicle = (msg:Model.BasicOBU<Model.Vehicle>) => {
      let carType = this._getCarType(4)
      const data = {
        longitude:msg.data.longitude,
        lattitude:msg.data.latitude,
        heading:msg.data.heading,
        speed:msg.data.speed,
        time_stamp:msg.time_stamp,
        type:carType
      }
      return data
  }

  public getVehicle = (handle:(bsm:BSMData)=>void) => {
    this.network.connection('ws/base/VEH_STATUS').then(res => {
      console.log('VEH_STATUS connected...')
    })

    let obu:BSMData = {}
    this.network.onMessage<Model.BasicOBU<Model.Vehicle>>((msg)=>{
      obu[msg.device_id.toString()] = this._parseVehicle(msg)
      handle(obu)
      obu = {}
    })

    return
  }

  public closeBSM = () => {
    this.network.closeSocket()
  }

  public closeVheicles = () => {
    this.network.closeSocket('ws/base/VEH_STATUS')
  }
}


export const BSM = (network: EasyWebSocket) => new BSMNetwork(network);
