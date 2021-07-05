/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{forwardRef,useEffect,useImperativeHandle} from 'react'
import {MapChildrenProps} from './Map'
import {MarkerIcon,MapType} from '../common'
import MarkerMotion,{CommercialVehicle,V2XScene,MotionConfig,VehType,VehicleIcon} from '../map-motion'
import {createMarker} from './Marker'
import OBUManager from '../v2x'
import GDUtils from '../gdmap/gd-utils'

type BSM = {
  longitude:number;
  lattitude:number;
  heading:number;
  speed:number;
  type:VehType;
  time_stamp:number;
}
export type BSMData = {[name:string]:BSM}

const service = ['Commercial', 'V2X'] as const;
type Service = typeof service[number];

interface OBUProps extends MapChildrenProps{
  updateMotion:(collect:(bsm:BSMData)=>void) => void;
  stop?:()=>void
  icon?:string;
  render?:JSX.Element;
  callBack?:(motion:MarkerMotion)=>void;
  label?:JSX.Element;
  labelDir?:'center'|'top'|'bottom'|'left'|'right';//需要设置label 才可以生效
  service?:Service[];//Commercial 运营服务；V2X 场景业务
  rotation?:number;
  offset?:{x:number;y:number}
  onload?:(obj:{[name:string]:MarkerMotion}) => void;
  history?:{startTime:number;endTime:number};
  config?:MotionConfig;
  gpsType?:'WGS84'|'JCG02';
}



//global variable
// let motionObjs:{[name:string]:MarkerMotion} = {}

export const OnBoardUnit = forwardRef((props:OBUProps,ref) => {
  const motionObjs = OBUManager.getInstance()
  const collectData = (bsm:BSMData) => {
    Object.keys(bsm).forEach(key => {
      const position = {longitude:bsm[key].longitude,lattitude:bsm[key].lattitude}
      let obu = motionObjs.get(key)
      if(obu){
        if(props.rotation){
          bsm[key].heading += props.rotation

        }
          obu.motionValue = bsm[key]
      }

      //create new obu object
      if(!obu){

        let newPos = position

        if(!props.gpsType || props.gpsType == 'JCG02'){//不是火星坐标
          const utils = new GDUtils(props.mapView!.map)
          newPos = utils.convertGPS(newPos)
        }

        const {newMarker} = createMarker(props.mapView!,
          {
            position:newPos,
            movePath:bsm[key],
            render:props.render,
            icon:props.render ? undefined:{
              url: props.icon ?props.icon:VehicleIcon[bsm[key].type],
              size: {width:26,height:50}
            } as MarkerIcon,
            offset:props.offset ? props.offset:{x:0,y:0}
          }
        )

        let newMotion = new MarkerMotion(props.mapView!,newMarker,props.config,key)

        if(props.service){//服务注入
          const initial = {icon:props.icon,position:position}
          if(props.service.includes('Commercial')){
             const vehicleService = new CommercialVehicle(initial)
             newMotion.commVeh = vehicleService
          }
          if(props.service.includes('V2X')){
             const v2xService = new V2XScene(initial)
             newMotion.v2xScene = v2xService
          }
        }

        props.mapView!.addMarker(newMarker)
        motionObjs.add(key,newMotion)
        obu = newMotion
      }

      if(props.callBack){
        props.callBack(obu)
      }
    })

  }

  useEffect(()=>{

    if(props.mapView){
      props.mapView.onload().then(map => {
        props.updateMotion(collectData)
      })

    }

    return (()=>{
      if(props.stop){
        props.stop()
        motionObjs.clear()
      }
    })
  },[props.history])

  useImperativeHandle(ref,()=>{
    return motionObjs
  },[motionObjs])

  return null
})
