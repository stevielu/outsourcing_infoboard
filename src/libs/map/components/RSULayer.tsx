/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,useEffect,useState,useMemo} from 'react'
import {MapChildrenProps} from './Map'
import TrafficLights,{TrafficLightConfig,LightColor} from '../map-light'
import {map} from 'lodash'
import {RSUManager} from '../v2x'
/*红绿灯配置*/


interface TrafficLightsLayerProps extends MapChildrenProps{
  dataConfig:{[name:string]:TrafficLightConfig[]};
  setData:(collect:(spat:SpatData) => void) => void;
  service?:string[];
  stop?:()=>void;
  history?:{startTime:number;endTime:number};
}

/*Spat消息*/
type SpatProps = {
  count:number;
  color:LightColor;
  phaseNumber:number;
}

export type SpatData = {[name:string]:SpatProps[]}


//global variable
// let rsuObjs:{[name:string]:TrafficLights[]} = {}

export const TrafficLightsLayer:FunctionComponent<TrafficLightsLayerProps> = (props) => {

  //Mount之前
  const [canvasWraper,setCanvasWraper] = useState<{[name:string]:HTMLCanvasElement}>({})//灯组画布
  const [config,setConfig] = useState({})
  const collectData = (spat:SpatData) => {
    Object.keys(spat).forEach(key => {//key 为当前路口编号
      if(props.mapView == undefined || canvasWraper == undefined){
        return
      }

      if(RSUManager.getInstance().get(key) && spat[key]){
        //对当前路口的每个灯组进行赋值，每个灯组代表一个灯盘单元
        RSUManager.getInstance().get(key).forEach(obj => {
          //灯盘里的红绿灯排列方式取决于spat配置相位列表的顺序
          const phaseList = obj.type.map(item => item.phase)

          //找到当前灯组对应相位的spat消息
          const value = phaseList.map(item => {
            const current = spat[key].find(spatVal => spatVal.phaseNumber == item)
            return  {
                color:current?current.color:LightColor.Default,
                count:current?current.count:0,
                phaseNumber:current?current.phaseNumber:0
            }
          })

          //设置灯组
          obj.trafficLight = value


        })

      }

      //create new rsu object 每个路口创建多个灯组，每个灯组对应一个画布层
      if(!RSUManager.getInstance().get(key)){
        if(RSUManager.getInstance().spatConfig[key]){
          setConfig(RSUManager.getInstance().spatConfig)
          const instances = RSUManager.getInstance().spatConfig[key].filter(item => canvasWraper[item.key] !== undefined).map(item => {
             const obj = new TrafficLights(props.mapView!,canvasWraper[item.key],{...item,type:item.lightType})
             obj.setMap(item.position)
             return obj
          })
          RSUManager.getInstance().add(key,instances)
        }
      }

    })
  }

  useEffect(()=>{
    props.mapView!.onload().then(map => {
      RSUManager.getInstance().spatConfig = {...props.dataConfig}
      props.setData(collectData)
    })
  },[canvasWraper,props.history])

  useEffect(()=>{
      Object.values(canvasWraper).forEach(item => {
        item.remove()
      })
      RSUManager.getInstance().spatConfig = {...props.dataConfig}
  },[props.dataConfig])

  useEffect(()=>{
    return (()=>{
      if(props.stop){
        props.stop()
      }
      RSUManager.getInstance().clear()
    })
  },[])

  return (
    <div>
    {
      map(RSUManager.getInstance().spatConfig,layer =>{
        return map(layer,tf =>{
          return (
            <div key = {tf.key}>
              <canvas ref = {(node) => {
                if(node){
                  canvasWraper[tf.key] = node
                  setCanvasWraper(canvasWraper)
                }
              }}>
              </canvas>
            </div>

          )
        })
      })
    }
    </div>
  )
}
