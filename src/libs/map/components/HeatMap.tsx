/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/

import {FunctionComponent,useEffect} from 'react'
import {MapChildrenProps} from './Map'
import {HeatMapData} from '../common'


interface HeatMapComponentsProps extends MapChildrenProps{
  dataSource:HeatMapData;

}



export const HeatMapLayer:FunctionComponent<HeatMapComponentsProps> = (props) => {

  //Mount之前
  const mapView = props.mapView//地图layer

  useEffect(()=>{

    if(mapView && props.loadState == true){
      mapView.onload().then(_ => {
          mapView.addHeatMapData(props.dataSource)
      })

    }
  },[props.loadState,props.dataSource])

  return null
}
