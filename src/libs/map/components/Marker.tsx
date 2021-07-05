/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import {FunctionComponent,useEffect,useState,useMemo} from 'react'
import MarkerAPI,{MarkerProps} from '../map-marker'
import MapInterface from '../map-core'
import {MapChildrenProps} from './Map'
type Path = {
  heading?:number;
  longitude:number;
  lattitude:number;
}

interface MarkerComponentsProps extends MarkerProps,MapChildrenProps{
  movePath?:Path;
  animationComplete?:() => void
  label?:JSX.Element
}


export const createMarker = (mapInstance:MapInterface,props:MarkerComponentsProps) => {
  // const newMarker = mapInstance.onload().then((map) => {
  //   return map.makeMarker(props)
  // })
  const newMarker = mapInstance.map.makeMarker(props)
  return {newMarker}
}

export const Marker:FunctionComponent<MarkerComponentsProps> = (props) => {
  const [marker,setMarker] = useState<MarkerAPI|null>(null)

  //Mount之前
  const mapView = props.mapView//地图layer
  //Mount之后 添加Marker
  useEffect(()=>{
    if(marker && mapView){
      console.log('add marker')
      mapView.addMarker(marker)

    }

    return () => {
      if(mapView && marker){
        console.log('remove marker')
        mapView.removeMarker(marker)
      }
    }
  },[marker])


  //移动动画
  const starMove = () => {
    if(marker && props.movePath){
      marker.moveTo([props.movePath],100,(e)=>{

      })
    }
  }


  useMemo(()=>{
    starMove()
  },[props.movePath])

  //update position
  useMemo(() => {
    if(marker && mapView){
      marker.setPositions(props.position.longitude,props.position.lattitude)
    }
  },[props.position])

  useMemo(()=>{
    if(marker && mapView && props.rotation){
      marker.setAngle(props.rotation)
    }
  },[props.rotation])


  useMemo(()=>{
    if(marker && props.render){
      marker.setIcon(props.render)
    }
  },[props.render])

  //创建标记实例
  useEffect(()=>{
    if(!marker && mapView && props.loadState == true){
      const mapObj = mapView.map//地图对象
      const newMarker = mapObj.makeMarker({
        ...props
      })
      setMarker(newMarker)

    }
  },[props.loadState])
  return null
}
