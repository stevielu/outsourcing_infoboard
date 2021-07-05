/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,useEffect,useState,useMemo} from 'react'
import {MapChildrenProps} from './Map'
import {Coordinates2D,MarkerIcon} from '../common'
import MapInterface from '../map-core'
import {MapVectorGraph} from '../map-vector'

/*折线*/
interface PolylinePorps extends MapChildrenProps {
  path:[Coordinates2D]
  width:number;
  color:string;
  borderColor?:string;
}

export const Polyline:FunctionComponent<PolylinePorps> = (props) => {
  useEffect(()=>{
    const mapInstance = props.mapView
    if(mapInstance){
      mapInstance.onload().then(map => {
        const polyline = new MapVectorGraph(mapInstance)
        polyline.vectorgraph.createPolyline(props.path,{...props})
      })
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
    if(mapInstance){
      mapInstance.onload().then(map => {
        const polyline = new MapVectorGraph(mapInstance)
        polyline.drawDashedLine(props.path,{width:props.width,color:props.color},props.dashedColor)
      })
    }

  },[])

  return null
}
