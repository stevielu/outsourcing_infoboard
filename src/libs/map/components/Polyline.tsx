/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,useEffect,useState,useCallback} from 'react'
import {MapChildrenProps} from './Map'
import {Coordinates2D,MarkerIcon} from '../common'
import MapInterface from '../map-core'
import {MapVectorGraph,PolyLine,Shape,Polygon} from '../map-vector'

/*折线*/
interface PolylinePorps extends MapChildrenProps {
  path:Coordinates2D[]
  width:number;
  color:string;
  borderColor?:string;
  onClick?:(map:MapInterface,shapeObj:PolyLine|Shape|Polygon)=>void;
}

export const usePolyline = (map:MapInterface)=>{
  const [polyline,setPolyline] = useState<PolyLine>()
  const addPolyline = useCallback((config:PolylinePorps) => {
    return new Promise<PolyLine>((reslove) =>{
      map.onload().then(_ => {
        const polyline = new MapVectorGraph(map)
        const target = polyline.vectorgraph.createPolyline(config.path,{...config})
        if(config.onClick){
          target.addEvent('click',config.onClick)
        }
        reslove(target)
        setPolyline(target)
      })
    })
  },[])

  const removePolyline = useCallback(()=>{
    return polyline? polyline.remove():false
  },[])
  return {polyline,addPolyline,removePolyline}
}

export const Polyline:FunctionComponent<PolylinePorps> = (props) => {
  useEffect(()=>{
    const mapInstance = props.mapView
    let target:PolyLine
    if(mapInstance){
      mapInstance.onload().then(map => {
        const polyline = new MapVectorGraph(mapInstance)
        target = polyline.vectorgraph.createPolyline(props.path,{...props})
        if(props.onClick){
          target.addEvent('click',props.onClick)
        }
      })
    }
    return ()=> {
      if(target){target.removeEvent('click')}
    }
  },[])

  return null
}


/*虚实折线*/
interface DashedPolylinePorps extends PolylinePorps {
  dashedColor:string
}

export const DashedPolyline:FunctionComponent<DashedPolylinePorps> = (props) => {
  useEffect(()=>{
    const mapInstance = props.mapView
    let target:PolyLine[]
    if(mapInstance){
      mapInstance.onload().then(map => {
        const polyline = new MapVectorGraph(mapInstance)
        const [solid,dashed] = polyline.drawDashedLine(props.path,{width:props.width,color:props.color},props.dashedColor)
        if(props.onClick){
          solid.addEvent('click',props.onClick)
          dashed.addEvent('click',props.onClick)
        }
        target = [solid,dashed]
      })
    }
    return ()=> {
      if(target){
        target[0].removeEvent('click')
        target[1].removeEvent('click')
      }
    }
  },[])

  return null
}
