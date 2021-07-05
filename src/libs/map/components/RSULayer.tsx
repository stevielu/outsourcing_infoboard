/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,useEffect,useState,useCallback,useMemo,useRef} from 'react'
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
  id?:string;//指定单个设备
}

/*Spat消息*/
type SpatProps = {
  count:number;
  color:LightColor;
  phaseNumber:number;
}

export type SpatData = {[name:string]:SpatProps[]}

//过滤spat消息，指定设备id
function filterSpat(target:string,data:SpatData){

  const result = Object.keys(data).filter( key => key === target)
  if(result.length > 0){
    return result.reduce((obj:SpatData,key:string) =>{
      obj[key] = data[key]
      return obj
    },{})
  }else{
    return {}
  }
}


export const TrafficLightsLayer:FunctionComponent<TrafficLightsLayerProps> = (props) => {
  //Mount之前
  const [canvasWraper,setCanvasWraper] = useState<{[name:string]:HTMLCanvasElement}>({})//灯组画布
  const [config,setConfig] = useState({})
  const rsuId = useRef(props.id)

  const reloadWrapper = useCallback(() => {
    RSUManager.getInstance().spatConfig = {...props.dataConfig}
  },[])

  const initial = useCallback(() => {
    props.mapView!.onload().then(map => {
      reloadWrapper()
      props.setData(collectData)
    })
  },[])

  const collectData = useCallback((spat:SpatData) => {
    let data = rsuId.current ? filterSpat(rsuId.current,spat):spat
    Object.keys(data).forEach(key => {//key 为当前路口编号
      if(props.mapView == undefined || canvasWraper == undefined){
        return
      }
      if(RSUManager.getInstance().get(key) && data[key]){
        //对当前路口的每个灯组进行赋值，每个灯组代表一个灯盘单元
        RSUManager.getInstance().get(key).forEach(obj => {
          //灯盘里的红绿灯排列方式取决于spat配置相位列表的顺序
          const phaseList = obj.type.map(item => item.phase)

          //找到当前灯组对应相位的spat消息
          const value = phaseList.map(item => {
            const current = data[key].find(spatVal => spatVal.phaseNumber == item)
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
  },[props.id])

  useEffect(()=>{
    initial()
  },[canvasWraper,props.history])

  useEffect(()=>{
      Object.values(canvasWraper).forEach(item => {
        item.remove()
      })
      reloadWrapper()
  },[props.dataConfig])

  useEffect(()=>{
    return (()=>{
      if(props.stop){
        props.stop()
      }
      RSUManager.getInstance().clear()
    })
  },[])

  useMemo(()=>{
    if(props.id){
      RSUManager.getInstance().clear()
      rsuId.current = props.id
      reloadWrapper()
    }
    return props.id
  },[props.id])

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
