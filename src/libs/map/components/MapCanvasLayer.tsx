/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import React,{FunctionComponent,useEffect,useState,useMemo} from 'react'
import {MapChildrenProps} from './Map'
import {Coordinates2D} from '../common'
import MapUtils from '../map-utils'

interface CanVasLayerComponentsProps extends MapChildrenProps{
  position:Coordinates2D;
  width:number;
  height:number;
  render:(context:CanvasRenderingContext2D)=>void;
}



export const CanvasLayer:FunctionComponent<CanVasLayerComponentsProps> = (props) => {

  //Mount之前
  const mapView = props.mapView//地图layer
  let canvasWraper:HTMLCanvasElement|null = null


  useEffect(()=>{
    if(mapView && canvasWraper && props.loadState == true){
      const renderCtx = canvasWraper.getContext('2d')
      const canvasRenderingFuc = () => {
        if(renderCtx)
        props.render(renderCtx)
      }

      mapView.addCanvasLayer(canvasWraper,canvasRenderingFuc)
    }
  },[props.loadState])

  return (
    <canvas ref = {(node) => {canvasWraper = node}}>
    </canvas>
  )
}
