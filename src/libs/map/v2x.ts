/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import MarkerMotion,{DataStatus} from './map-motion'
import TrafficLights,{TrafficLightConfig} from './map-light'
/*OBU 管理器*/
const EXPIRE = 5000
export default class OBUManager{


  private static instance: OBUManager;
  public objSequence = 0;
  public obuGroup:{[name:string]:MarkerMotion} = {}
  constructor(){
    const pollingTask = setInterval(()=>{
    this.checkAlive()
  },EXPIRE)
  }

  public static getInstance(): OBUManager {
      if (!OBUManager.instance) {
          OBUManager.instance = new OBUManager();
      }
      return OBUManager.instance;
  }


  public add = (id:string,object:MarkerMotion) =>{
    this.objSequence += 1;
    object.sequence = this.objSequence
    this.obuGroup[id] = object
  }

  public get = (id:string)=>{
    return this.obuGroup[id]
  }

  public clear = () =>{
    Object.values(this.obuGroup).forEach(item => item.remove())
    this.obuGroup = {}
    this.objSequence = 0
  }

  public checkAlive = () =>{
    Object.keys(this.obuGroup).forEach(key => {
      const item = this.obuGroup[key]
      if(this.obuGroup[key].status === DataStatus.Receiving){
        item.remove()
        delete this.obuGroup[key]
      }else{
        item.status = DataStatus.Receiving
      }
    })
  }
  
}

/*RSU 管理器*/
export class RSUManager{


  private static instance: RSUManager;
  //RSU 单元组
  public rsuGroup:{[name:string]:TrafficLights[]} = {}
  //红绿灯组配置文件
  public spatConfig:{[name:string]:TrafficLightConfig[]} = {}

  constructor(){

  }

  public static getInstance(): RSUManager {
      if (!RSUManager.instance) {
          RSUManager.instance = new RSUManager();
      }
      return RSUManager.instance;
  }


  public add = (id:string,object:TrafficLights[]) =>{
    this.rsuGroup[id] = object
  }

  public get = (id:string)=>{
    return this.rsuGroup[id]
  }

  public clear = () =>{
    console.log('clearing rsu data')
    Object.values(this.rsuGroup).forEach(lights => lights.forEach(item =>{
      item.removeCanvasLayer()
    }))
    this.rsuGroup = {}
    this.spatConfig = {}
  }

}
